import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Patch,
    Delete, UseBefore, Req
} from 'routing-controllers';
import {AppDataSource} from '../../db/data-source';
import {Admin} from '../../entity/Admin';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {AdminAuthMiddelware} from "../../middleware/adminAuth";
import {User} from "../../entity/User";
import {NodeMailerSendEmail} from "../../email/NodeMailerSendEmail";

@JsonController("/admin")
export class AdminController {
    private clientUrl = "http://localhost:8000";

    constructor(private adminRepository, private userRepository) {
        this.adminRepository = AppDataSource.getRepository(Admin);
        this.userRepository = AppDataSource.getRepository(User);
    }

    @Post("/register")
    public async register(@Body() data: Admin) {
        try {
            // verif object existing in data source
            const hasAccountWithEmail: Admin = await this.adminRepository.findOne({where: {mail: data.getMail()}});
            const hasAccountWithUsername: Admin = await this.adminRepository.findOne({where: {username: data.getUsername()}});
            if (hasAccountWithEmail || hasAccountWithUsername) throw new Error('Account existing. Please Login');

            // hash password
            const hash = await bcrypt.hash(data.getPassword(), 10);

            // create object with condition
            const admin: Admin = data;
            if (!admin) throw new Error('Account not created');
            admin.setPassword(hash);

            await this.adminRepository.save(admin);

            return {success: "Account created"};
        } catch (error) {
            return {error: error.message};
        }
    }

    @Post("/login")
    public async login(@Body() data: Admin, @Req() req: any) {
        try {
            // find object in data source
            const admin: Admin = await this.adminRepository.findOne({where: {mail: data.getMail()}});
            if (!admin) throw new Error('Account not found');

            // check if password conform
            const isValid = await bcrypt.compare(data.getPassword(), admin.getPassword());
            if (!isValid) throw new Error('Identifiant/password incorrect');

            req.session.token = jwt.sign({
                id: admin.getId(),
                roles: admin.getRoles(),
            }, "SECRET_TOKEN_KEY", {
                expiresIn: "24h"
            });

            if (!req.session.token) throw new Error('Error authentication');

            return {success: "Account login !"};

        } catch (error) {
            return {error: error.message};
        }
    }

    @Delete("/logout")
    public async logout(@Req() req: any) {
        try {
            if (!req.session.token) throw new Error('Unable to logout');

            req.session.destroy();

            return {success: "Logout with success"};
        } catch (error) {
            return {error: error.message};
        }
    }

    @Post("/requestResetPassword")
    @UseBefore(AdminAuthMiddelware)
    public async requestResetPassword(@Body() data: Admin, @Req() req: any) {
        try {
            const admin: Admin = await this.adminRepository.findOne({where: {mail: data.getMail()}});
            if (!admin) throw new Error('Account not found');

            let resetToken = crypto.randomBytes(32).toString("hex");
            const hash = await bcrypt.hash(resetToken, 10);

            req.session.token = hash;

            // get url for reset password
            const link = `${this.clientUrl}/passwordReset?token=${resetToken}&id=${admin.getId()}`;

            const sendMail = new NodeMailerSendEmail();
            await sendMail.sendEmail(admin.getMail(), "Demande de réinitialisation du mot de passe.", admin.getUsername(), link);

            return link;

        } catch (error) {
            return {error: error.message};
        }
    }

    @Patch("/resetPassword")
    public async resetPassword(@Body() data: any, @Req() req: any) {
        try {
            let passwordResetToken = await req.session.token;
            if (!passwordResetToken) throw new Error('Invalid or expired password reset token');

            const isValid = await bcrypt.compare(data.token, passwordResetToken);
            if (!isValid) throw new Error('Invalid or expired password reset token');

            const hash = await bcrypt.hash(data.password, 10);

            const admin: Admin = await this.adminRepository.findOne({where: {id: data.id}});
            if (!admin) throw new Error('Account not found');
            admin.setPassword(hash);

            await this.adminRepository.save(admin);

            return {success: "Password reset"};
        } catch (error) {
            return {error: error.message};
        }
    }

    @Get('/list')
    @UseBefore(AdminAuthMiddelware)
    public async getAll() {
        try {
            const admins = await this.adminRepository.find({order: {id: "DESC"}});
            if (!admins) throw new Error('List account not found');

            return admins;
        } catch (err) {
            return {error: err.message}
        }
    }

    @Get('/:username')
    @UseBefore(AdminAuthMiddelware)
    public async getOne(@Param('username') identifiant: string) {
        try {
            const admin = await this.adminRepository.findOne({where: {username: identifiant}});
            if (!admin) throw new Error('Account not found');

            return admin;
        } catch (err) {
            return {error: err.message}
        }
    }

    @Patch('/:id/:username')
    @UseBefore(AdminAuthMiddelware)
    public async update(@Param('id') id: string, @Param('username') username: string, @Body() data: Admin) {
        try {
            const admin: Admin = await this.adminRepository.findOne({where: {id, username}});
            if (!admin) throw new Error('Account not found');

            if (data.getPassword() != undefined) {
                // hash password
                const hash = await bcrypt.hash(data.getPassword(), 10);
                if (!admin) throw new Error('Account not updated');
                admin.setPassword(hash);

                await this.adminRepository.save(admin);
            } else {
                await this.adminRepository.save({...admin, ...data});
            }

            return {success: "Account updated"};
        } catch (err) {
            return {error: err.message}
        }
    }

    @Delete('/:id/:username')
    @UseBefore(AdminAuthMiddelware)
    public async remove(@Param('id') id: string, @Param('username') username: string) {
        try {
            const admin: Admin = await this.adminRepository.findOne({where: {id, username}});
            if (!admin) throw new Error('Account not found');

            await this.adminRepository.delete(admin);
            return {success: "Account deleted"};
        } catch (err) {
            return {error: err.message}
        }
    }

}
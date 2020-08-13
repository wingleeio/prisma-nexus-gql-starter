import { schema } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validateArgs, validateEmail } from './utils';

schema.mutationType({
    definition(t) {
        t.crud.createOneComment();
        t.crud.updateOneComment();
        t.crud.deleteOneComment();
        t.crud.createOnePost();
        t.crud.updateOnePost();
        t.crud.deleteOnePost();
        t.crud.createOneCommunity();
        t.crud.updateOneCommunity();
        t.crud.deleteOneCommunity();
        t.crud.updateOneUser();

        t.field('register', {
            type: 'Auth',
            args: {
                email: schema.stringArg({ nullable: false }),
                username: schema.stringArg({ nullable: false }),
                password: schema.stringArg({ nullable: false })
            },
            resolve: async (_parent, args, ctx) => {
                const invalid = validateArgs(args, {
                    email: (email: string) => validateEmail(email),
                    username: (username: string) => username.length >= 1,
                    password: (password: string) => password.length >= 6
                });

                if (invalid.length > 0) {
                    throw new Error('Invalid Fields: [' + invalid + ']');
                }

                const { email, password, username } = args;
                const hashedPassword = await hash(password, 10);
                const user = await ctx.db.user.create({
                    data: {
                        email,
                        hashedPassword,
                        username
                    }
                })

                return {
                    token: sign({ id: user.id }, process.env.JWT_SECRET)
                }
            }
        })

        t.field('login', {
            type: 'Auth',
            args: {
                email: schema.stringArg({ nullable: false }),
                password: schema.stringArg({ nullable: false })
            },
            resolve: async (_parent, args, ctx) => {
                const { email, password } = args;
                const user = await ctx.db.user.findOne({ where: { email } })
                if (!user) {
                    throw new Error(`No user found with email: ${email}`);
                }

                const validLogin = await compare(password, user.hashedPassword);

                if (!validLogin) {
                    throw new Error('Invalid password.')
                }

                return {
                    token: sign({ id: user.id }, process.env.JWT_SECRET)
                }
            }
        })
    }
})
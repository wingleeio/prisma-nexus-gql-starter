import { shield, rule, not, and, or } from 'nexus-plugin-shield'

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
    const user = await ctx.db.user.findOne({ where: { id: ctx?.token?.id } })
    return Boolean(user?.id);
})

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const user = await ctx.db.user.findOne({ where: { id: ctx?.token?.id } })
    return user.role === 'ADMIN';
})

const isAuthorSameAsUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const user = await ctx.db.user.findOne({ where: { id: ctx?.token?.id } })
    return args?.data?.author?.connect?.id === user?.id;
})

const isSameUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    const user = await ctx.db.user.findOne({ where: { id: ctx?.token?.id } })
    return args?.where?.id === user?.id;
})

export const permissions = shield({
    rules: {
        Mutation: {
            login: not(isAuthenticated),
            register: not(isAuthenticated),
            createOnePost: and(isAuthenticated, isAuthorSameAsUser),
            updateOnePost: and(isAuthenticated, or(isAuthorSameAsUser, isAdmin)),
            deleteOnePost: isAdmin,
            createOneComment: and(isAuthenticated, isAuthorSameAsUser),
            updateOneComment: and(isAuthenticated, or(isAuthorSameAsUser, isAdmin)),
            deleteOneComment: isAdmin,
            createOneCommunity: isAuthenticated,
            updateOneCommunity: isAdmin,
            deleteOneCommunity: isAdmin,
            updateOneUser: and(isAuthenticated, or(isSameUser, isAdmin))
        },
    },
})

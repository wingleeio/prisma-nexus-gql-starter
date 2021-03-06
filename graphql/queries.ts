import { schema } from 'nexus';

schema.queryType({
    definition(t) {
        t.crud.user();
        t.crud.post();
        t.crud.comment()
        t.crud.community();
        t.crud.users({ filtering: true, ordering: true });
        t.crud.posts({ filtering: true, ordering: true });
        t.crud.comments({ filtering: true, ordering: true })
        t.crud.communities({ filtering: true, ordering: true });

        t.field('me', {
            type: 'User',
            nullable: true,
            resolve: (parent, args, ctx) => {
                const userId = ctx?.token?.id;
                if (!userId) {
                    throw new Error('Invalid userId')
                }
                return ctx.db.user.findOne({
                    where: {
                        id: parseInt(userId),
                    },
                })
            },
        })
    }
})
import { schema } from 'nexus';

schema.objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.email();
        t.model.joined();
        t.model.username();
        t.model.role();
        t.model.posts({ pagination: true });
    }
})

schema.objectType({
    name: 'Post',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.title();
        t.model.content();
        t.model.author();
        t.model.community();
        t.model.comments({ pagination: true });
    }
})

schema.objectType({
    name: 'Community',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.posts({ pagination: true })
    }
})

schema.objectType({
    name: 'Comment',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.content();
        t.model.author();
        t.model.post();
    }
})

schema.objectType({
    name: 'Auth',
    definition(t) {
        t.string('token');
    }
})

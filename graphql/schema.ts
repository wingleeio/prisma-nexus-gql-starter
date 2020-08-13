import { use, schema } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { auth } from 'nexus-plugin-jwt-auth';
import { permissions } from './permissions';

use(prisma({
    features: {
        crud: true
    }
}));

use(auth({
    appSecret: process.env.JWT_SECRET
}))

use(permissions)

require('./types');

require('./mutations');

require('./queries');

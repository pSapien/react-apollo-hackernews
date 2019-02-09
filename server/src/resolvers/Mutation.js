const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { APP_SECRET } = require('../config');

function getUserId(ctx) {
  const Auth = ctx.request.get('Authorization');

  if (!Auth) throw new Error('User not authenticated');

  const token = Auth.replace('Bearer ', '');
  const { userId } = jwt.verify(token, APP_SECRET);
  return userId;
}

async function signup(parent, args, ctx, info) {
  const user = await ctx.prisma.createUser({
    ...args,
    password: await bcrypt.hash(args.password, 10),
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function login(parent, args, ctx, info) {
  const { email, password: passwordFromClient } = args;

  const user = await ctx.prisma.user({ email });
  const noUserFoundInDB = !user;
  if (noUserFoundInDB) throw new Error('No such error found');

  const { password: passwordInDB } = user;
  const passwordFromClientMatchesInDB = await bcrypt.compare(
    passwordFromClient,
    passwordInDB
  );
  if (!passwordFromClientMatchesInDB) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

function post(parent, args, ctx, info) {
  const { url, description } = args;
  return ctx.prisma.createLink({
    url,
    description,
    postedBy: { connect: { id: getUserId(ctx) } },
  });
}

module.exports = {
  signup,
  login,
  post,
};

function feed(parent, args, ctx, info) {
  return ctx.prisma.links();
}

module.exports = {
  feed,
};

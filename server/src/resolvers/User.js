function links(parent, args, ctx) {
  const { id } = parent;
  return ctx.prisma.user({ id }).links();
}

module.exports = {
  links,
};

const { User } = require("../../database/models");

async function DeleteUserWithId(id) {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Error deleting user" };
  }
}

module.exports = { DeleteUserWithId };

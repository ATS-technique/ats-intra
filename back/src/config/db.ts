import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import User from "../model/user"; // Assurez-vous que le chemin est correct
import bcrypt from "bcrypt";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT || "8889", 10),
    define: {
      timestamps: true,
      underscored: true,
    },
  },
);

async function createAdminUser() {
  try {
    const adminMail = process.env.ADMIN_MAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    const existingAdmin = await User.findOne({ where: { mail: adminMail } });
    if (!existingAdmin && adminMail && adminPassword && adminName) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: adminName,
        mail: adminMail,
        password: hashedPassword,
        is_active: true,
      });
      console.log("Compte administrateur créé :", adminMail);
    }
  } catch (err) {
    console.error("Erreur lors de la création du compte admin :", err);
  }
}

// Synchronisation et création admin
sequelize.sync().then(() => {
  createAdminUser();
});

export default sequelize;

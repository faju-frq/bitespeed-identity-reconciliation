import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.config";
interface ContactAttributes {
  id: number;
  email?: string;
  phoneNumber?: string;
  linkedId?: number | null;
  linkPrecedence: "Primary" | "Secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type ContactCreationAttributes = Optional<
  ContactAttributes,
  "id" | "linkedId" | "linkPrecedence" | "deletedAt"
>;

export class Contact
  extends Model<ContactAttributes, ContactCreationAttributes>
  implements ContactAttributes
{
  public id!: number;
  public email?: string;
  public phoneNumber?: string;
  public linkedId?: number | null;
  public linkPrecedence!: "Primary" | "Secondary";
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public deletedAt?: Date | null;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "contacts",
        key: "id",
      },
    },
    linkPrecedence: {
      type: DataTypes.ENUM("Primary", "Secondary"),
      defaultValue: "Secondary",
    },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
    timestamps: true,
  }
);

Contact.belongsTo(Contact, { as: "linkedContact", foreignKey: "linkedId" });
Contact.hasMany(Contact, { as: "secondaryContacts", foreignKey: "linkedId" });

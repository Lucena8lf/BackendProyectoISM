import mysql from "mysql2/promise";
import { config } from "./config";

export const connect = async () => {
  // Función para establecer conexión
  return await mysql.createConnection(config); // Devolvemos la conexión
};

import { DataSource } from "typeorm";
import { User } from "./entities/user";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "jaeyong-cho",
  password: "jaeyong-cho",
  database: "todos",
  synchronize: true,
  logging: false,
  entities: [User], // 엔티티를 추가합니다.
  migrations: [],
  subscribers: [],
});

export default AppDataSource;

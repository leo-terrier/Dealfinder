///queries
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pg from "pg";

export const devEnv = process.env.NODE_ENV === "development";

dotenv.config({ path: "./.env.server" });

const { Pool } = pg;

export const pool = devEnv
  ? new Pool({
      user: "leoterrier",
      host: "localhost",
      database: "dealFinder",
      password: process.env.DB_PW,
      port: 5432,
    })
  : new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

///LOGIN & REGISTRATION

export const deserialize = async (user_id, done) => {
  console.log(deserialize);
  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id],
    (err, results) => {
      if (err) return done(err);
      done(null, results.rows[0]);
    }
  );
};

export const authUser = (username, password, done) => {
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [username],
    async (err, results) => {
      console.log("Auth reached");
      if (err) return done(err); //catch error (sys)
      if (!results.rows[0]) {
        console.log("user not found");
        return done(null, false);
      }
      const matchedPassword = await bcrypt.compare(
        password,
        results.rows[0].password
      );
      if (!matchedPassword) {
        console.log("wrong password");
        return done(null, false);
      }
      return done(null, results.rows[0]);
    }
  );
};

export const createUser = async (req, res, next) => {
  console.log("createUser reached");
  const { firstName, lastName, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, username, hash],
    (error, results) => {
      try {
        if (error) {
          throw error;
        }
        req.login(results.rows[0], () => {
          console.log("user logged in (after registration");
          res.send(req.user);
        });
      } catch (e) {
        console.log("creation fail : ");
        console.log(e);
        res.status(401).json(e);
      }
    }
  );
};

export const addSavedSearch = (req, res, next) => {
  const {
    search_id,
    address,
    zipcode,
    minSurface,
    maxSurface,
    minPrice,
    maxPrice,
    specStreet,
  } = req.body;

  pool.query(
    "INSERT INTO savedSearches VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",

    [
      search_id,
      req.user.user_id,
      address,
      zipcode,
      minSurface,
      maxSurface,
      minPrice,
      maxPrice,
      specStreet,
    ],

    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`Search added with id: ${results.rows[0].search_id}`);
      console.log(`Search added by user with id: ${req.user.user_id}`);
      res.send({ "search added": results.rows[0] });
    }
  );
};
export const addSavedDeal = (req, res) => {
  const {
    deal_id,
    date,
    streetNumber,
    streetName,
    zipcode,
    city,
    price,
    surface,
  } = req.body;

  pool.query(
    "INSERT INTO savedDeals VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",

    [
      req.user.user_id,
      deal_id,
      date,
      streetNumber,
      zipcode,
      city,
      price,
      surface,
      streetName,
    ],

    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(`Deal added with id: ${results.rows[0].deal_id},`);
      console.log(`from user with id: ${req.user.user_id}`);
      res.send({ "Deal added": results.rows[0] });
    }
  );
};

export const getSearches = (req, res) => {
  pool.query(
    "SELECT * FROM savedSearches WHERE user_id = $1",
    [req.user.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(
        "Getting saved searches from user with id : " + req.user.user_id
      );
      console.log("Saved searches : ");
      console.log(results.rows);
      res.json(results.rows);
    }
  );
};

export const getDeals = (req, res) => {
  pool.query(
    "SELECT * FROM savedDeals WHERE user_id = $1",
    [req.user.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(
        "Getting saved deals from user with id : " + req.user.user_id
      );
      console.log("Saved deals : ");
      console.log(results.rows);
      res.json(results.rows);
    }
  );
};

export const deleteSavedSearch = (req, res) => {
  pool.query("DELETE FROM savedSearches WHERE search_id= $1", [
    req.params.search_id,
  ]),
    (error, results) => {
      if (error) {
        throw error;
      }
    };
  console.log("Deleting search of user with id : " + req.user.user_id);
  console.log("Search deleted with id : " + req.params.search_id);
  res.send({ "search deleted": req.params.search_id });
};

export const deleteSavedDeal = (req, res) => {
  pool.query("DELETE FROM savedDeals WHERE deal_id= $1 AND user_id= $2", [
    req.params.deal_id,
    req.user.user_id,
  ]),
    (error, results) => {
      if (error) {
        throw error;
      }
    };
  console.log("Deleting saved deal of user with id : " + req.user.user_id);
  console.log("Deal deleted with id : " + req.params.deal_id);
  res.send({ "deal deleted": req.params.deal_id });
};

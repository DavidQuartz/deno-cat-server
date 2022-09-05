import { opine, Router, json } from "./deps.ts";
import { getDatabase, addToDatabase } from "./db.ts"; 

const app = opine();
const router = Router();

// Add our /cats route to the v1 API router
// for retrieving a list of all the cats.
router.get("/cats", (req, res) => {
  res.setStatus(200).json({
    success: "true",
    data: getDatabase(),
  });
});


// *** NEW ***
// Add our /cats route to the v1 API router
// for uploading a cat to the database.
router.put("/cats", (req, res) => {
  const cat = req.parsedBody;
  addToDatabase(cat);
  res.sendStatus(201);
});

// *** NEW ***
// We use the Opine JSON body parser to allow
// us to parse the upload cat JSON object.
app.use(json());

// Mount the v1 API router onto our server
// at the /api/v1 path.
app.use("/api/v1", router);

const PORT = 3000;

// Start our server on the desired port.
app.listen(PORT);

console.log(`API server running on port ${PORT}`);
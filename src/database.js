import * as neo4j from 'neo4j-driver';

const uri = 'neo4j+s://1693e124.databases.neo4j.io:7687';
const user = 'neo4j';
const passwordNeo = 'kwRfn1Ak-qqe7Jxybt8SwplT5--cP1cfEcIuo5tJlnM';



/**
 * Creates an user on the platform
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @param {*} age 
 * @param {*} location 
 */
export const createUser = async (name, email, password, age, location) => {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, passwordNeo)); // driver for neo4j
    const session = driver.session();
    try {
        // Check if there is already an user with that email
        const readQuery = `MATCH (p:Person)
                      WHERE p.email = $email
                      RETURN p.id`
        const readResult = await session.readTransaction(tx =>
            tx.run(readQuery, { email: email })
        );
        if (readResult.records.length > 0) return false;  // Cannot duplicate users

        const writeQuery = `
            CREATE (p:Person {name: $name, email: $email, password: $password, age: $age})
            MERGE(place:Place {name: $location})
            MERGE (p)-[:LIVES_IN]->(place)
            RETURN p, place
        `; // Query to 

        const writeResult = await session.writeTransaction(tx =>
            tx.run(writeQuery, { name, email, password, age, location })
        )

        writeResult.records.forEach(record => {
            // const person1Node = record.get('p')
            // const person2Node = record.get('place')
            // console.log(
            //     person1Node,
            //     person2Node
            // )
        });
        await session.close();
        await driver.close();
        return true;
    } catch (error) {
        console.error('Something went wrong', error);
        return false;
    }
}




/**
 * Creates an user on the platform
 * @param {*} email 
 * @param {*} password 

 */
export const loginUser = async (email, password) => {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, passwordNeo)); // driver for neo4j
    const session = driver.session();
    try {
        // Check if there is already an user with that email
        const readQuery = `MATCH (p:Person)
                      WHERE p.email = $email AND p.password = $password
                      RETURN p.email`
        const readResult = await session.readTransaction(tx =>
            tx.run(readQuery, { email, password })
        );
        if (readResult.records.length <= 0) return false;  // Cannot duplicate users
        await session.close();
        await driver.close();
        return email;
    } catch (error) {
        console.error('Something went wrong', error);
        return null;
    }
}


/**
 * Makes an user buy a car
 * @param {*} email Email for the user
 * @param {*} id Id for the user
 * @returns 
 */
export const buyCar = async (email, id) => {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, passwordNeo)); // driver for neo4j
    const session = driver.session();
    try {

        const writeQuery = `
            MATCH (p: Person), (c: Carro)
            WHERE p.email = $email AND ID(c) = $id
            MERGE (p)-[:HAS]->(c)
            RETURN p, c
        `; // Query to 

        const writeResult = await session.writeTransaction(tx =>
            tx.run(writeQuery, { email, id })
        )

        await session.close();
        await driver.close();
        return true;
    } catch (error) {
        console.error('Something went wrong', error);
        return false;
    }
}


/**
 * Get all the nearest cars
 * QUERY:
 * MATCH(p1: Person) - [: LIVES_IN] -> (pl:Place)< -[: LIVES_IN] - (p2:Person) -[: HAS] -> (c:Carro)
 * WHERE p1.email = "san191517@uvg.edu.gt"
 * MERGE(p1) - [w: WOULD_LIKE] -> (c)
 * return c
 */
export const getNearCars = async (email) => {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, passwordNeo)); // driver for neo4j
    const session = driver.session();
    try {
        // Check if there is already an user with that email
        const readQuery = `
        MATCH(p1: Person) - [: LIVES_IN] -> (pl:Place)<-[: LIVES_IN] - (p2:Person) -[: HAS] -> (c:Carro)
        WHERE p1.email = $email AND NOT(p1)-[:HAS]->(c:Carro)
        MERGE(p1) - [w: WOULD_LIKE] -> (c)
        RETURN c.Nombre, ${'c.`Año`'}, c.Fabricante, c.Modelo, c.Pais, c.Tipo, ID(c) as id
        LIMIT 3`
        const cars = [];
        const readResult = await session.readTransaction(tx =>
            tx.run(readQuery, { email })
        );
        // Fill the object
        readResult.records.forEach(record => {
            let carro = {
                name: '',
                year: '',
                company: '',
                model: '',
                country: '',
                type: '',
                id: ''
            }
            carro.name = record.get('c.Nombre');
            carro.year = record.get('c.`Año`').low;
            carro.company = record.get('c.Fabricante');
            carro.model = record.get('c.Modelo');
            carro.country = record.get('c.Pais');
            carro.type = record.get('c.Tipo');
            carro.id = record.get('id').low;
            cars.push(carro);
        });
        await session.close();
        await driver.close();
        return cars;
    } catch (error) {
        console.error('Something went wrong', error);
        return null;
    }
}
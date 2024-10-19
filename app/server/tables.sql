CREATE TABLE users (id INT )CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    register_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
 

 CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE cart_details(
    id integer NOT NULL ,
    order_id integer,
    quantity integer NOT NULL,
    price numeric(10, 2) NOT NULL,
    total numeric(10, 2) GENERATED ALWAYS AS (((quantity)::numeric * price)) STORED,
    CONSTRAINT cart_details_pkey PRIMARY KEY (id),
    CONSTRAINT cart_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
)
const fs = require('fs');

const newRecipes = [
  {
    "id": "atol-elote-1",
    "title": "Atol de Elote",
    "description": "Una bebida caliente prehispánica y reconfortante a base de maíz dulce (elote) tierno molido. Es la bebida por excelencia de las tardes frías o lluviosas en Guatemala, dulce, cremosa y con un sutil aroma a canela.",
    "basePortions": 6,
    "category": "Bebida",
    "difficulty": "Fácil",
    "prepTime": "15 min",
    "cookTime": "30 min",
    "temperature": "Fuego lento",
    "rating": 4.9,
    "author": "Atoleras de la Antigua",
    "utensils": ["Licuadora", "Colador fino o manta", "Olla honda", "Paleta de madera"],
    "tips": "No dejes de mover el atol mientras hierve, de lo contrario se pegará al fondo y tomará sabor a quemado. El elote debe ser amarillo y tierno, si está muy sazón (duro), el atol quedará rasposo.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Elotes amarillos y tiernos desgranados", "qty": 6, "unit": "unidades", "price": 12.00, "store": "Mercado" },
      { "name": "Leche entera", "qty": 1, "unit": "litro", "price": 10.00, "store": "Supermercado" },
      { "name": "Azúcar", "qty": 1, "unit": "taza", "price": 3.00, "store": "Abarrotería" },
      { "name": "Canela en raja", "qty": 2, "unit": "unidades", "price": 2.00, "store": "Mercado" },
      { "name": "Sal", "qty": 1, "unit": "pizca", "price": 0.50, "store": "Abarrotería" }
    ],
    "steps": [
      {
        "title": "Licuado del Elote",
        "description": "Licúa los granos de elote tierno con un poco de agua o parte de la leche hasta obtener una mezcla muy fina. Pasa esta mezcla por un colador fino o una manta para extraer solo el jugo y desechar el bagazo.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Licuar y colar", "minutes": 10 }
      },
      {
        "title": "Hervor Aromático",
        "description": "Vierte el líquido colado en una olla. Agrega el resto de la leche, la canela en raja, el azúcar y la pizca de sal (la sal realza el dulzor natural del maíz).",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Cocción Lenta y Constante",
        "description": "Cocina a fuego medio-bajo sin dejar de mover con una paleta de madera. El atol empezará a espesar rápidamente. Una vez que hierva a borbotones gruesos, apaga el fuego. Sirve inmediatamente espolvoreando un poco de canela en polvo arriba.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Mover el atol", "minutes": 20 }
      }
    ]
  },
  {
    "id": "shucos-1",
    "title": "Shucos Guatemaltecos",
    "description": "La comida callejera más famosa de la ciudad. Una reinterpretación brutal del hot dog, usando pan tostado al carbón, un untado generoso de guacamol, repollo cocido y embutidos asados a la parrilla (chorizo, longaniza, salchicha y tocino).",
    "basePortions": 4,
    "category": "Comida Rápida",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "temperature": "Parrilla caliente",
    "rating": 4.8,
    "author": "Carretas de la Esquina",
    "utensils": ["Parrilla o comal grande", "Pinzas", "Cuchillo de sierra"],
    "tips": "El pan perfecto debe estar bien tostado por fuera y suave por dentro. No le quites la semilla al aguacate al hacer el guacamol hasta el momento de servirlo, para que no se ponga negro.",
    "isPublic": true,
    "isContestEntry": true,
    "ingredients": [
      { "name": "Panes para shuco (pan de hot dog alargado y suave)", "qty": 4, "unit": "unidades", "price": 8.00, "store": "Panadería" },
      { "name": "Chorizo guatemalteco (rojo)", "qty": 2, "unit": "unidades", "price": 10.00, "store": "Carnicería" },
      { "name": "Longaniza", "qty": 2, "unit": "unidades", "price": 10.00, "store": "Carnicería" },
      { "name": "Salchicha grande", "qty": 2, "unit": "unidades", "price": 8.00, "store": "Supermercado" },
      { "name": "Aguacates maduros", "qty": 3, "unit": "unidades", "price": 15.00, "store": "Mercado" },
      { "name": "Repollo picado cocido con sal y orégano", "qty": 2, "unit": "tazas", "price": 5.00, "store": "Mercado" },
      { "name": "Mostaza, Ketchup y Mayonesa", "qty": 1, "unit": "mix", "price": 10.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Preparación del Guacamol y Repollo",
        "description": "Pasa por agua hirviendo el repollo picado con orégano y escúrrelo bien. Por aparte, machaca los aguacates con sal y limón hasta formar un puré suave (guacamol).",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Cocer repollo", "minutes": 5 }
      },
      {
        "title": "El Asado de las Carnes",
        "description": "En una parrilla o comal bien caliente, asa los chorizos, longanizas y salchichas partidos por la mitad a lo largo. Deja que doren bien por ambos lados.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Asar embutidos", "minutes": 10 }
      },
      {
        "title": "El Armado del Shuco",
        "description": "Corta el pan por en medio sin separarlo totalmente. Ásalo ligeramente por dentro. Unta generosamente ambos lados con guacamol. Pon una capa de repollo cocido y coloca encima los embutidos asados.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800"
      },
      {
        "title": "Aderezo Final",
        "description": "Baña el shuco con abundantes líneas de mostaza, mayonesa y salsa de tomate (ketchup). Si te gusta el picante, este es el momento de agregar salsa de chile cobanero.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      }
    ]
  },
  {
    "id": "tostadas-3-salsas-1",
    "title": "Tostadas Clásicas (Salsa, Frijol, Guacamol)",
    "description": "El trío dinámico de las tardes chapinas. Una comida ligera o refacción consistente en tostadas crujientes de maíz untadas con frijol volteado, guacamol o salsa de tomate, coronadas con queso seco, perejil picado y cebolla.",
    "basePortions": 6,
    "category": "Antojito",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "temperature": "Frío",
    "rating": 5,
    "author": "Antojitos Chapines",
    "utensils": ["Licuadora", "Tazones", "Sartén", "Cuchillo"],
    "tips": "Para las tostadas de salsa, cocina bien el tomate con orégano y un toque de azúcar para cortar la acidez. El frijol debe estar bien espeso (volteado) para que no aguade la tostada.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Tostadas gruesas de maíz", "qty": 18, "unit": "unidades", "price": 15.00, "store": "Mercado/Supermercado" },
      { "name": "Frijoles negros colados y fritos (volteados)", "qty": 2, "unit": "tazas", "price": 10.00, "store": "Supermercado" },
      { "name": "Aguacates grandes maduros", "qty": 3, "unit": "unidades", "price": 12.00, "store": "Mercado" },
      { "name": "Tomates de cocina", "qty": 1, "unit": "lb", "price": 5.00, "store": "Mercado" },
      { "name": "Queso seco o duro rallado", "qty": 4, "unit": "oz", "price": 8.00, "store": "Mercado" },
      { "name": "Perejil fresco picado", "qty": 1, "unit": "manojo", "price": 2.00, "store": "Mercado" },
      { "name": "Cebolla en rodajas muy finas", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Salsa de Tomate Casera",
        "description": "Hierve los tomates con ajo y cebolla. Licúalos sin agua. Sofríe este puré en una sartén con aceite, orégano, sal, pimienta y un toque de azúcar hasta que espese un poco.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800",
        "timer": { "name": "Sofreír salsa", "minutes": 10 }
      },
      {
        "title": "El Guacamol",
        "description": "Machaca la pulpa de los aguacates. Agrega sal al gusto, un poco de limón y cebolla finamente picada. Mezcla bien hasta lograr un puré cremoso.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      },
      {
        "title": "Untar",
        "description": "Toma las tostadas. A 6 de ellas, úntales generosamente frijol volteado. A otras 6, úntales el guacamol. Y a las últimas 6, báñalas con la salsa de tomate fría.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "El Decorado Clásico",
        "description": "Espolvorea generosamente queso seco sobre todas las tostadas. Agrega un chorrito de perejil picado al centro y, si te gusta, un par de rodajas de cebolla sobre las de frijol y salsa. Sírvelas juntas para que contrasten los colores negro, verde y rojo.",
        "imageUrl": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800"
      }
    ]
  },
  {
    "id": "chiles-rellenos-1",
    "title": "Chiles Rellenos",
    "description": "Chiles pimientos asados y desvenados, rellenos de un picadillo de carne y verduras, envueltos en huevo batido a punto de nieve y fritos. Servidos comúnmente en un pan francés o con arroz y salsa.",
    "basePortions": 6,
    "category": "Plato fuerte",
    "difficulty": "Avanzada",
    "prepTime": "45 min",
    "cookTime": "45 min",
    "temperature": "Fritura media",
    "rating": 4.7,
    "author": "Cocina Diaria",
    "utensils": ["Comal", "Sartén para freír", "Batidora", "Tabla de picar"],
    "tips": "Al asar los chiles, mételos inmediatamente en una bolsa plástica por 10 minutos; el vapor hará que la piel se desprenda facilísimo. Bate las claras de huevo hasta que la espuma no se caiga al voltear el tazón.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Chiles pimientos medianos", "qty": 6, "unit": "unidades", "price": 12.00, "store": "Mercado" },
      { "name": "Carne molida de res o cerdo", "qty": 1, "unit": "lb", "price": 30.00, "store": "Carnicería" },
      { "name": "Papas finamente picadas", "qty": 2, "unit": "unidades", "price": 4.00, "store": "Mercado" },
      { "name": "Zanahorias finamente picadas", "qty": 2, "unit": "unidades", "price": 4.00, "store": "Mercado" },
      { "name": "Huevos", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Aceite para freír", "qty": 1.5, "unit": "taza", "price": 8.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Asado y Pelado",
        "description": "Asa los chiles enteros en el comal hasta que la piel esté negra. Mételos en una bolsa sellada por 10 min. Luego, pélalos, hazles un corte lateral y sácale todas las semillas con cuidado de no romperlos.",
        "imageUrl": "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800",
        "timer": { "name": "Sudar chiles", "minutes": 10 }
      },
      {
        "title": "El Picadillo",
        "description": "Sofríe la carne molida con ajo y cebolla. Agrega la papa, zanahoria, ejote picado y cocina hasta que todo esté tierno y el relleno no tenga líquido.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Cocinar picadillo", "minutes": 15 }
      },
      {
        "title": "Rellenar",
        "description": "Toma cada chile pelado y rellénalo firmemente con el picadillo. Trata de cerrar el corte para que recupere su forma original.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "El Envoltorio de Huevo",
        "description": "Separa claras de yemas. Bate las claras a punto de nieve (hasta que formen picos firmes). Agrega las yemas suavemente, sal y un poco de harina para estabilizar la espuma.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "El Fritado",
        "description": "Pasa los chiles rellenos por la espuma de huevo cubriéndolos por completo. Sumérgelos inmediatamente en aceite caliente. Dóralos de ambos lados y escúrrelos en papel toalla.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Freír chiles", "minutes": 10 }
      }
    ]
  },
  {
    "id": "bunuelos-1",
    "title": "Buñuelos en Miel de Anís",
    "description": "Un dulce tradicional frito a base de una masa muy esponjosa (tipo pâte à choux), bañada generosamente en una miel casera perfumada con anís y canela. Son un clásico de las celebraciones de la Virgen del Rosario y fin de año.",
    "basePortions": 8,
    "category": "Postre",
    "difficulty": "Media",
    "prepTime": "30 min",
    "cookTime": "30 min",
    "temperature": "Fritura profunda caliente",
    "rating": 5,
    "author": "Dulces Típicos",
    "utensils": ["Olla para miel", "Sartén honda para freír", "Paleta de madera", "Cucharas"],
    "tips": "El éxito de un buen buñuelo está en la masa: debe cocinarse la harina en el agua hirviendo y luego añadir los huevos uno por uno fuera del fuego. Se inflarán solos en el aceite.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Harina de trigo", "qty": 1, "unit": "taza", "price": 5.00, "store": "Supermercado" },
      { "name": "Agua", "qty": 1, "unit": "taza", "price": 0.00, "store": "Casa" },
      { "name": "Huevos grandes", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Aceite (para freír profundamente)", "qty": 2, "unit": "tazas", "price": 10.00, "store": "Supermercado" },
      { "name": "Panela (rapadura) o azúcar morena", "qty": 1, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Anís de estrella y canela en raja", "qty": 1, "unit": "porción", "price": 3.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "La Miel de Anís",
        "description": "En una olla, pon a hervir agua con la panela, la canela y el anís. Deja reducir a fuego lento hasta obtener un jarabe espeso y aromático. Apaga y reserva caliente.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Hervir miel", "minutes": 25 }
      },
      {
        "title": "La Masa (Primera fase)",
        "description": "En otra olla, hierve el agua con una pizca de sal y un toque de manteca/mantequilla. Cuando hierva a borbotones, de golpe echa toda la harina y apaga el fuego. Remueve vigorosamente con la paleta de madera hasta que la masa se despegue de la olla y forme una bola.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "La Masa (Segunda fase)",
        "description": "Deja entibiar la masa. Agrega los huevos UNO POR UNO, mezclando enérgicamente después de cada huevo hasta que se integre totalmente. La masa final debe ser elástica y brillante.",
        "imageUrl": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800"
      },
      {
        "title": "Formar y Freír",
        "description": "Calienta el aceite en un sartén hondo a fuego medio. Toma pequeñas porciones de masa con una cuchara y déjalas caer en el aceite caliente. Verás que ellos mismos se inflan y se dan vuelta solos cuando se doran por un lado.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír buñuelos", "minutes": 15 }
      },
      {
        "title": "El Baño Dulce",
        "description": "Sirve 3 o 4 buñuelos calientes en un plato hondo y báñalos generosamente con la miel de anís hirviendo.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "caldo-res-1",
    "title": "Caldo de Res Chapín",
    "description": "Sustancioso, abundante y muy nutritivo. Este es el caldo por excelencia para reponer fuerzas, con cortes de carne con hueso que dan mucho sabor, acompañados de grandes trozos de elote, güisquil, papa y repollo. Acompañado de tortillas negras, aguacate y limón.",
    "basePortions": 6,
    "category": "Sopa",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "120 min",
    "temperature": "Hervor lento",
    "rating": 4.9,
    "author": "La Abuela",
    "utensils": ["Olla inmensa", "Cucharón grande", "Cuchillo de golpe"],
    "tips": "El caldo queda infinitamente más sabroso si usas cortes con hueso como la aguja, el tuétano o la costilla, además de la posta. Desespuma constantemente durante la primera hora.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Posta de res (o bolovique)", "qty": 2, "unit": "lb", "price": 60.00, "store": "Carnicería" },
      { "name": "Hueso de res (tuétano o costilla carnuda)", "qty": 1.5, "unit": "lb", "price": 30.00, "store": "Carnicería" },
      { "name": "Elotes tiernos (partidos por la mitad)", "qty": 3, "unit": "unidades", "price": 8.00, "store": "Mercado" },
      { "name": "Güisquil verde", "qty": 2, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Papas grandes", "qty": 4, "unit": "unidades", "price": 8.00, "store": "Mercado" },
      { "name": "Repollo en cuartos", "qty": 0.5, "unit": "unidad", "price": 4.00, "store": "Mercado" },
      { "name": "Zanahoria grande", "qty": 2, "unit": "unidades", "price": 5.00, "store": "Mercado" },
      { "name": "Yuca (opcional pero recomendada)", "qty": 1, "unit": "lb", "price": 6.00, "store": "Mercado" },
      { "name": "Hierbabuena fresca", "qty": 1, "unit": "manojo", "price": 2.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Cocción Lenta de las Carnes",
        "description": "Lava las carnes y colócalas en una olla grande con abundante agua fría. Agrega sal, ajo entero y una cebolla blanca. Lleva a ebullición y quita la espuma gris que sube a la superficie. Cocina a fuego lento.",
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "timer": { "name": "Cocer carne", "minutes": 90 }
      },
      {
        "title": "El Orden de las Verduras",
        "description": "Las verduras deben agregarse según su dureza. Cuando la carne empiece a ablandar, echa los trozos de elote y la yuca. Quince minutos después, agrega la zanahoria y el güisquil.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Verduras duras", "minutes": 15 }
      },
      {
        "title": "Verduras Suaves",
        "description": "Por último, agrega las papas cortadas a la mitad y los cuartos de repollo. Esto evitará que se deshagan en el caldo.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Verduras suaves", "minutes": 15 }
      },
      {
        "title": "Aroma Final",
        "description": "Apaga el fuego cuando todo esté cocido. Echa un buen manojo de hierbabuena fresca, tapa la olla y deja reposar 5 minutos. El aroma será espectacular.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800"
      }
    ]
  },
  {
    "id": "rellenitos-1",
    "title": "Rellenitos de Plátano Fritos",
    "description": "Pequeñas esferas dulces elaboradas con puré de plátano macho maduro, rellenas en su interior de frijoles volteados o manjar de vainilla, fritas hasta quedar crujientes por fuera y suaves por dentro. Se sirven espolvoreadas con azúcar.",
    "basePortions": 12,
    "category": "Postre / Refacción",
    "difficulty": "Media",
    "prepTime": "30 min",
    "cookTime": "25 min",
    "temperature": "Fritura media",
    "rating": 5,
    "author": "Dulces Tradicionales",
    "utensils": ["Olla", "Tenedor para majar", "Sartén", "Papel absorbente"],
    "tips": "El puré de plátano no necesita azúcar extra ni harina, la textura se logra cociéndolo bien y amasando. El aceite no debe estar hiper caliente para que no se quemen por fuera quedando crudos de la masa.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Plátanos maduros grandes (cáscara casi negra)", "qty": 4, "unit": "unidades", "price": 10.00, "store": "Mercado" },
      { "name": "Frijoles negros volteados, dulces (con azúcar, chocolate y canela)", "qty": 1, "unit": "taza", "price": 6.00, "store": "Casero" },
      { "name": "Azúcar (para espolvorear)", "qty": 0.5, "unit": "taza", "price": 2.00, "store": "Abarrotería" },
      { "name": "Canela en polvo", "qty": 1, "unit": "cda", "price": 1.00, "store": "Abarrotería" },
      { "name": "Aceite para freír", "qty": 1, "unit": "taza", "price": 5.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Cocer y Majar los Plátanos",
        "description": "Corta los plátanos en rodajas y cuécelos en agua (puedes dejarlos con cáscara para que absorban menos agua). Escúrrelos, pélalos y usa un tenedor o triturador para hacerlos puré hasta que sea una masa suave sin grumos. Déjala enfriar.",
        "imageUrl": "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800",
        "timer": { "name": "Hervir plátanos", "minutes": 15 }
      },
      {
        "title": "El Frijol Dulce (El Relleno)",
        "description": "Asegúrate de que los frijoles volteados sean dulces; fríelos con un poco de azúcar, canela en polvo y un cuadrito de chocolate hasta que sean una pasta firme que no se escurra.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      },
      {
        "title": "Armar los Rellenitos",
        "description": "Humedece un poco tus manos para que la masa no se pegue. Toma una porción de puré de plátano y haz una tortilla cóncava (como nido) en tu mano. Pon una cucharadita del frijol dulce en el centro y cierra la masa dándole forma de huevito u óvalo alargado.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Freír",
        "description": "Fríelos en el sartén con aceite caliente, girándolos suavemente para que doren parejo. Toman un color oscuro rápido debido al azúcar natural del plátano. Escurre en papel.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír", "minutes": 8 }
      },
      {
        "title": "Servir",
        "description": "Aún tibios, espolvoréalos generosamente con el azúcar granulada pura (o mezclada con canela).",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "tamalitos-chipilin-1",
    "title": "Tamalitos de Chipilín",
    "description": "Sencillos, rústicos y deliciosos. Masa de maíz amasada con manteca y combinada con las hojas de una planta nativa (el chipilín), que les otorga su característico sabor herbáceo. Se comen calientes como acompañamiento o rociados con queso y salsa.",
    "basePortions": 15,
    "category": "Acompañamiento",
    "difficulty": "Fácil",
    "prepTime": "30 min",
    "cookTime": "60 min",
    "temperature": "Vapor",
    "rating": 4.5,
    "author": "Cocina de Campo",
    "utensils": ["Olla vaporera", "Tazón grande"],
    "tips": "El chipilín suelta todo su sabor si amasas las hojas crudas directamente con la masa. No omitas la manteca, de lo contrario quedarán duros.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Masa de maíz fina", "qty": 2, "unit": "lb", "price": 10.00, "store": "Molino" },
      { "name": "Hojas de chipilín fresco (sin tallos)", "qty": 1.5, "unit": "taza", "price": 4.00, "store": "Mercado" },
      { "name": "Manteca de cerdo derretida", "qty": 4, "unit": "oz", "price": 6.00, "store": "Carnicería" },
      { "name": "Sal", "qty": 1, "unit": "cda", "price": 0.50, "store": "Casa" },
      { "name": "Hojas de tusa (maíz seco)", "qty": 1, "unit": "manojo", "price": 5.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Preparar la Masa",
        "description": "Deshoja el chipilín para usar solo las hojitas crudas y lavadas. En un recipiente grande, amasa la masa de maíz con la manteca, sal y un poco de agua hasta que esté manejable y sazonada. Incorpora las hojas de chipilín integrándolas bien en la masa.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Envolver en Tusa",
        "description": "Toma una tusa previamente hidratada en agua caliente. Coloca unas dos cucharadas colmadas de la masa en el extremo ancho de la tusa, envuélvelo girando la hoja y dobla la punta estrecha hacia atrás para sellar el paquete. (No requiere amarre).",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Cocer al Vapor",
        "description": "Colócalos parados en una olla vaporera. Cocina al vapor durante aproximadamente una hora hasta que al abrir un tamalito la masa se despegue limpia de la hoja.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Vaporera", "minutes": 60 }
      }
    ]
  },
  {
    "id": "atol-platano-1",
    "title": "Atol de Plátano",
    "description": "Otra de las bebidas calientes favoritas de la época lluviosa. Es un atol de color rosado oscuro o ámbar, denso y aromático, elaborado con la cocción de plátano macho maduro, endulzado con panela y especias.",
    "basePortions": 6,
    "category": "Bebida",
    "difficulty": "Fácil",
    "prepTime": "15 min",
    "cookTime": "30 min",
    "temperature": "Hervor suave",
    "rating": 4.6,
    "author": "Atoles de Feria",
    "utensils": ["Licuadora", "Olla de peltre o metal"],
    "tips": "El plátano debe estar lo más maduro posible (cáscara negra), esto le da su dulzor y color característico oscuro, evitando que necesites mucha panela.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Plátanos muy maduros", "qty": 3, "unit": "unidades", "price": 8.00, "store": "Mercado" },
      { "name": "Agua", "qty": 1.5, "unit": "litro", "price": 0.00, "store": "Casa" },
      { "name": "Canela en raja grande", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Pimienta gorda", "qty": 4, "unit": "granos", "price": 1.00, "store": "Mercado" },
      { "name": "Panela (rapadura) o azúcar morena", "qty": 0.5, "unit": "lb", "price": 5.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Hervir el Plátano",
        "description": "Lava los plátanos, córtales las puntas y pártelos a la mitad con todo y cáscara. Ponlos a hervir en una olla con el agua, canela y pimienta gorda hasta que la cáscara se rompa y estén muy suaves.",
        "imageUrl": "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800",
        "timer": { "name": "Hervir plátano", "minutes": 15 }
      },
      {
        "title": "Licuar y Colar",
        "description": "Saca los plátanos, pélalos (desecha la cáscara) y licúa la pulpa usando un poco del agua aromática de la cocción. Pasa el licuado grueso a la olla de nuevo.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Cocción Final con Panela",
        "description": "Agrega más agua si es necesario para dar el espesor deseado de atol. Agrega la panela y hierve a fuego lento removiendo constantemente hasta que todo se integre y espese. Sirve hirviendo.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Mover atol", "minutes": 10 }
      }
    ]
  },
  {
    "id": "garnachas-1",
    "title": "Garnachas Antigüeñas",
    "description": "Bocadillos crujientes consistentes en tortillas muy pequeñas fritas, con un centro de carne molida sofrita de forma muy particular, bañadas con salsa de tomate y servidas con un curtido agridulce de repollo por encima.",
    "basePortions": 4,
    "category": "Antojito",
    "difficulty": "Media",
    "prepTime": "30 min",
    "cookTime": "20 min",
    "temperature": "Fritura media",
    "rating": 4.8,
    "author": "Antojitos de Feria",
    "utensils": ["Sartén grande de fondo grueso", "Licuadora", "Tazón"],
    "tips": "El éxito de la garnacha es que la carne quede casi pegada o embebida en la masa. Las señoras en la feria las fríen con la carne puesta encima en abundante aceite.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Tortillas muy pequeñas (tipo moneda grande) de masa gruesa", "qty": 20, "unit": "unidades", "price": 10.00, "store": "Tortillería" },
      { "name": "Carne molida de res", "qty": 1, "unit": "lb", "price": 30.00, "store": "Carnicería" },
      { "name": "Tomates maduros", "qty": 1, "unit": "lb", "price": 5.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Repollo finamente picado", "qty": 0.5, "unit": "unidad", "price": 4.00, "store": "Mercado" },
      { "name": "Vinagre y sal para curtir", "qty": 1, "unit": "mix", "price": 3.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Curtido Blanco Simple",
        "description": "Lava el repollo picado con agua caliente. Escúrrelo y agrégale abundante sal, vinagre de manzana y orégano. Déjalo reposar para que se encurta. (Debe quedar crujiente y ácido).",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Preparación de Carne y Salsa",
        "description": "Sofríe la carne molida con cebolla finamente picada, sal y pimienta. Asegúrate de que quede muy suelta. Por aparte, haz una salsa rala cociendo tomates y licuándolos con poca sal.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Cocinar carne", "minutes": 15 }
      },
      {
        "title": "Fritura Ensamblada",
        "description": "Calienta aceite en un sartén. Coloca una cucharada pequeña de la carne molida sobre el centro de cada tortillita e inmediatamente sumérgelas en el aceite caliente. El borde de la masa se pondrá crujiente.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír garnachas", "minutes": 5 }
      },
      {
        "title": "Servir Rápidamente",
        "description": "Escurre las tortillitas. Sírvelas en un plato, ponles un poco de curtido en el centro de cada una, y justo al llevarlas a la mesa, báñalas con la salsa de tomate tibia y espolvorea queso seco.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  }
];

// Deduplicate existing elements based on ID
// Note: We'll read the existing file, filter out duplicate IDs if any, and append the new ones.
const filePath = 'src/lib/data/recipes.json';
const data = fs.readFileSync(filePath, 'utf8');
let currentRecipes = [];
try {
  currentRecipes = JSON.parse(data);
} catch (e) {
  console.error("Error parsing JSON:", e);
}

// Remove duplicates from currentRecipes if any new ones overwrite them (like rellenitos or caldo-res)
const newIds = newRecipes.map(r => r.id);
const filteredCurrent = currentRecipes.filter(r => !newIds.includes(r.id));

const combined = [...filteredCurrent, ...newRecipes];

fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
console.log(`Successfully appended recipes. Total recipes now: ${combined.length}`);


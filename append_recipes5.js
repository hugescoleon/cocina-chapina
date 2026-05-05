const fs = require('fs');

const newRecipes = [
  {
    "id": "pollo-amarillo-1",
    "title": "Pollo en Amarillo",
    "description": "Un guiso tradicional, suave y reconfortante. El color amarillo vibrante se logra gracias a un recado a base de miltomate y verduras, donde la zanahoria y la papa aportan no solo textura, sino un matiz dulce que balancea perfectamente con el pollo.",
    "basePortions": 4,
    "category": "Plato fuerte",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "45 min",
    "temperature": "Hervor lento",
    "rating": 4.5,
    "author": "Cocina Diaria",
    "utensils": ["Olla", "Licuadora", "Comal"],
    "tips": "Para intensificar el color, muchas abuelas agregan una pizca de azafrán o achiote amarillo. Acompaña obligatoriamente con arroz blanco para aprovechar el caldito.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Piezas de pollo", "qty": 2, "unit": "lb", "price": 16.00, "store": "Carnicería" },
      { "name": "Miltomate", "qty": 0.5, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Tomate", "qty": 0.5, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Zanahorias y papas (en rodajas o cuadros)", "qty": 2, "unit": "tazas", "price": 5.00, "store": "Mercado" },
      { "name": "Chile pimiento rojo o amarillo", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Cocer el Pollo",
        "description": "Hierve el pollo con sal, ajo y cebolla. A media cocción, agrega las papas y zanahorias para que se ablanden sin deshacerse.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Hervir", "minutes": 25 }
      },
      {
        "title": "El Recado Amarillo",
        "description": "Asa en el comal el miltomate, el tomate y el chile pimiento. Licúalos finamente con un poco de caldo de pollo. Este recado debe quedar de un color amarillo anaranjado.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Integración",
        "description": "Vierte el recado licuado a la olla con el pollo y verduras. Deja que todo hierva a fuego bajo por 15 minutos para que el recado espese y los sabores se unifiquen.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Guisar", "minutes": 15 }
      }
    ]
  },
  {
    "id": "pacayas-envueltas-1",
    "title": "Pacayas Envueltas en Huevo",
    "description": "La flor de palma comestible más famosa de Mesoamérica. Su distintivo sabor amargo se suaviza al cocerla y se balancea perfectamente cuando se envuelve en huevo batido, se fríe y se baña en una salsa de tomate rojo y dulce.",
    "basePortions": 4,
    "category": "Plato Fuerte / Vegetariano",
    "difficulty": "Media",
    "prepTime": "20 min",
    "cookTime": "30 min",
    "temperature": "Fritura media",
    "rating": 4.6,
    "author": "Cocina de Cuaresma",
    "utensils": ["Olla", "Sartén", "Batidora"],
    "tips": "Para quitarles el amargo excesivo, muchas personas las hierven dos veces, tirando la primera agua. A otras les encanta ese sabor amargo intacto.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Pacayas tiernas (frescas o en salmuera)", "qty": 4, "unit": "unidades", "price": 10.00, "store": "Mercado" },
      { "name": "Huevos", "qty": 3, "unit": "unidades", "price": 5.00, "store": "Mercado" },
      { "name": "Tomate de cocina (para la salsa)", "qty": 1, "unit": "lb", "price": 5.00, "store": "Mercado" },
      { "name": "Aceite para freír", "qty": 1, "unit": "taza", "price": 5.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Limpieza y Cocción",
        "description": "Pela las pacayas quitándoles las hojas duras hasta llegar al centro tierno. Hiérvelas en agua con sal hasta que estén suaves. Escúrrelas y déjalas secar en papel toalla.",
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "timer": { "name": "Hervir pacayas", "minutes": 20 }
      },
      {
        "title": "El Capeado",
        "description": "Separa las claras de yemas. Bate las claras a punto de nieve firme y envuelve las yemas suavemente con un poco de sal y harina.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Fritura y Baño",
        "description": "Sumerge cada pacaya en el huevo batido y fríelas inmediatamente en aceite caliente de ambos lados. Sírvelas bañadas en una salsa de tomate o 'chirmol' y acompáñalas con queso seco.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Freír", "minutes": 10 }
      }
    ]
  },
  {
    "id": "fiambre-rojo-1",
    "title": "Fiambre Rojo Tradicional",
    "description": "El platillo más complejo, masivo y sagrado de Guatemala. Preparado solo para el 1 de Noviembre (Día de Todos los Santos). Es una gigantesca ensalada fría que mezcla decenas de verduras curtidas en vinagre, con una docena de carnes frías, embutidos y quesos. Una verdadera obra maestra culinaria.",
    "basePortions": 20,
    "category": "Plato Festivo / Frío",
    "difficulty": "Experta",
    "prepTime": "3 días",
    "cookTime": "12 horas",
    "temperature": "Frío",
    "rating": 5.0,
    "author": "Herencia Familiar",
    "utensils": ["Múltiples ollas inmensas", "Tazones gigantes", "Tablas de picar"],
    "tips": "El Fiambre no se hace en un día. Requiere planificación. El caldillo (la mezcla de vinagre, mostaza, aceite y caldos de carne) se debe preparar y dejar caer sobre la verdura 48 horas antes de comer para que se 'curta' a la perfección.",
    "isPublic": true,
    "isContestEntry": true,
    "ingredients": [
      { "name": "Verduras: Remolacha, repollo, zanahoria, ejote, coliflor, pacaya, arveja, bruselas", "qty": 15, "unit": "lbs", "price": 150.00, "store": "Mercado" },
      { "name": "Embutidos: Chorizo negro, colorado, longaniza, salchichas, butifarra, salami", "qty": 10, "unit": "lbs", "price": 300.00, "store": "Carnicería" },
      { "name": "Carnes: Lengua de res, pollo, lomo de cerdo", "qty": 8, "unit": "lbs", "price": 200.00, "store": "Carnicería" },
      { "name": "Lácteos: Queso seco, queso fresco, queso de capas, queso kraft", "qty": 5, "unit": "lbs", "price": 150.00, "store": "Supermercado" },
      { "name": "Caldillo: Vinagre, aceite de oliva, mostaza, laurel, tomillo, orégano", "qty": 1, "unit": "mix gigante", "price": 50.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Día 1: Las Carnes y el Caldillo",
        "description": "Hierve todas las carnes por separado. Guarda los caldos (especialmente el de lengua y pollo). Corta las carnes en cuadros. Por aparte, prepara el caldillo mezclando vinagre, los caldos de las carnes, mostaza, aceite de oliva y todas las especias aromáticas hirviendo todo junto.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Cocer carnes", "minutes": 180 }
      },
      {
        "title": "Día 2: Las Verduras y el Curtido",
        "description": "Pica finamente TODAS las verduras. Hiérvelas (blanquea) por separado para que mantengan su textura. La remolacha es clave, cuecela entera, pélala y córtala; esta teñirá todo de rojo. Mezcla todas las verduras en un recipiente gigante y báñalas completamente con el caldillo preparado el día anterior. Refrigera.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Día 3: Embutidos y Ensamblaje",
        "description": "Hierve y fríe los embutidos, córtalos en rodajas. Saca la verdura ya curtida y mézclala con el 70% de las carnes, embutidos y quesos. El 30% restante se reserva para adornar.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "El Emplatado",
        "description": "En platos hondos, sirve una montaña de la mezcla curtida. Ahora viene el arte: decora meticulosamente con rodajas de los embutidos reservados, tiras de queso, rabanitos, pacayas, un huevo duro en rodajas y queso seco espolvoreado. Se come frío el 1 de Noviembre.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "platanos-mole-1",
    "title": "Plátanos en Mole",
    "description": "Un postre inusual y delicioso. Rodajas de plátano macho maduro frito, sumergidas en una espesa salsa de chocolate artesanal guatemalteco combinada con semillas tostadas (pepitoria, ajonjolí) y chiles secos que le aportan profundidad sin picor.",
    "basePortions": 6,
    "category": "Postre",
    "difficulty": "Media",
    "prepTime": "20 min",
    "cookTime": "30 min",
    "temperature": "Caliente o Frío",
    "rating": 5.0,
    "author": "Repostería Tradicional",
    "utensils": ["Comal", "Sartén", "Licuadora", "Olla de barro"],
    "tips": "El chocolate debe ser el clásico de taza o tablilla (con azúcar y canela incluida). Se espolvorea con ajonjolí tostado justo al servir.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Plátanos muy maduros", "qty": 4, "unit": "unidades", "price": 10.00, "store": "Mercado" },
      { "name": "Chocolate guatemalteco en tablilla", "qty": 2, "unit": "tablillas", "price": 12.00, "store": "Mercado" },
      { "name": "Tomate de cocina", "qty": 2, "unit": "unidades", "price": 3.00, "store": "Mercado" },
      { "name": "Miltomate", "qty": 4, "unit": "oz", "price": 3.00, "store": "Mercado" },
      { "name": "Ajonjolí y pepitoria", "qty": 1, "unit": "taza pequeña", "price": 5.00, "store": "Mercado" },
      { "name": "Chile pasa (sin semillas)", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Pan dulce (para espesar)", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Panadería" }
    ],
    "steps": [
      {
        "title": "Freír el Plátano",
        "description": "Corta los plátanos en rodajas sesgadas (alargadas). Fríelas en aceite caliente hasta que doren fuertemente. Escúrrelas bien en papel toalla.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Freír", "minutes": 10 }
      },
      {
        "title": "Tostar y Licuar",
        "description": "Tuesta el ajonjolí, la pepitoria y el chile pasa en un comal. Por aparte, hierve el tomate y miltomate. Licúa todo esto junto con un pedazo de pan dulce remojado para espesar.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800",
        "timer": { "name": "Licuar mole", "minutes": 10 }
      },
      {
        "title": "Derretir Chocolate y Guisar",
        "description": "En una olla, disuelve el chocolate de tablilla en un poco de agua caliente. Agrega la mezcla licuada y deja hervir. Sumerge las rodajas de plátano en este mole dulce y deja hervir a fuego mínimo por 5 minutos.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Guisar", "minutes": 5 }
      }
    ]
  },
  {
    "id": "chuchitos-colorados-1",
    "title": "Chuchitos Colorados",
    "description": "La comida rápida de Guatemala desde la época prehispánica. Una masa firme de maíz mezclada con manteca, un recado rojo espeso y un trozo de carne de cerdo o pollo, todo envuelto firmemente en hojas de tusa secas y cocido al vapor.",
    "basePortions": 15,
    "category": "Plato Fuerte / Antojito",
    "difficulty": "Media",
    "prepTime": "60 min",
    "cookTime": "90 min",
    "temperature": "Vapor",
    "rating": 4.9,
    "author": "Cocina Diaria",
    "utensils": ["Vaporera", "Tazón grande", "Licuadora", "Olla pequeña"],
    "tips": "El recado debe estar EXTREMADAMENTE ESPESO (como una pasta) antes de rellenar el chuchito, de lo contrario aguadará la masa y se desbordará. Amarra fuerte con tiras de la misma tusa.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Masa de maíz fina", "qty": 3, "unit": "lb", "price": 12.00, "store": "Molino" },
      { "name": "Manteca de cerdo derretida", "qty": 8, "unit": "oz", "price": 8.00, "store": "Carnicería" },
      { "name": "Tomate de cocina", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Chile guaque y chile pasa", "qty": 3, "unit": "unidades", "price": 3.00, "store": "Mercado" },
      { "name": "Carne de cerdo (posta en cuadros cruda) o pollo", "qty": 1.5, "unit": "lb", "price": 25.00, "store": "Carnicería" },
      { "name": "Hojas de tusa seca", "qty": 1, "unit": "manojo grande", "price": 10.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "El Recado Rojo",
        "description": "Hierve los tomates y chiles. Licúalos y sofríe la salsa en un poco de aceite o manteca hasta que quede una pasta roja muy espesa. Condimenta con sal.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Sofreír recado", "minutes": 15 }
      },
      {
        "title": "Preparar la Masa",
        "description": "Amasa la masa de maíz con la manteca de cerdo, un poco de agua tibia y sal abundante. La masa de los chuchitos debe ser mucho más firme y moldeable que la de un tamal.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Envolver y Amarrar",
        "description": "En una hoja de tusa húmeda, pon una bola de masa, haz un hueco profundo. Coloca un trozo de carne cruda y llénalo de recado espeso. Cierra la masa sobre el recado. Cierra la tusa formando un saquito y amárralo por la parte superior.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "Al Vapor",
        "description": "Cocínalos parados en una olla vaporera. Sírvelos calientes bañados con salsa de tomate extra, perejil y queso seco.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Vaporera", "minutes": 90 }
      }
    ]
  },
  {
    "id": "paches-papa-1",
    "title": "Paches de Papa",
    "description": "La versión quetzalteca del tamal. Su base no es masa de maíz, sino un rico puré de papa amasado con manteca y recado, relleno de carne de cerdo y un infaltable chile verde entero para darle un aroma picante sutil. Tradición de los días jueves.",
    "basePortions": 10,
    "category": "Plato Fuerte / Tamales",
    "difficulty": "Avanzada",
    "prepTime": "60 min",
    "cookTime": "90 min",
    "temperature": "Vapor a fuego medio",
    "rating": 4.9,
    "author": "Receta Quetzalteca",
    "utensils": ["Ollas grandes", "Hojas de plátano", "Hojas de maxán"],
    "tips": "El pache perfecto lleva el recado integrado directamente en el puré de papa, no separado. Usa papa loma que es más seca. El chile francés (verde picante) crudo entero es la firma de un buen pache.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Papa (variedad loma o de masa firme)", "qty": 5, "unit": "lb", "price": 20.00, "store": "Mercado" },
      { "name": "Manteca de cerdo", "qty": 1, "unit": "lb", "price": 15.00, "store": "Carnicería" },
      { "name": "Tomate de cocina", "qty": 2, "unit": "lb", "price": 10.00, "store": "Mercado" },
      { "name": "Miltomate, cebolla, ajo, chiles guaque/pasa", "qty": 1, "unit": "mix", "price": 10.00, "store": "Mercado" },
      { "name": "Carne de cerdo en trozos medianos (cruda)", "qty": 1.5, "unit": "lb", "price": 30.00, "store": "Carnicería" },
      { "name": "Chile pimiento verde picante (francés)", "qty": 10, "unit": "unidades pequeñas", "price": 5.00, "store": "Mercado" },
      { "name": "Hojas de plátano y maxán para envolver", "qty": 1, "unit": "paquete", "price": 15.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "El Puré",
        "description": "Cuece las papas con cáscara. Pélalas estando calientes y machácalas fuertemente hasta lograr un puré fino sin grumos.",
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "timer": { "name": "Majar papas", "minutes": 20 }
      },
      {
        "title": "El Recado",
        "description": "Asa todos los ingredientes del recado (tomate, miltomate, chiles secos, ajo, cebolla). Licúalos finamente.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "La Mezcla Maestra",
        "description": "En una olla inmensa, pon a derretir la manteca de cerdo. Agrega el recado licuado y sofríe. Inmediatamente vierte todo el puré de papa. Remueve con fuerza (es muy cansado) hasta que todo el puré absorba el recado y la manteca, quedando una masa roja, brillosa y exquisita. Ponle sal.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Amasar al fuego", "minutes": 25 }
      },
      {
        "title": "Envolver",
        "description": "Corta cuadros de hoja de plátano sobre hoja de maxán (asadas). Pon un cucharón grande de masa de papa roja. En el centro inserta un trozo de carne de cerdo cruda y un chile verde picante entero. Dobla las hojas formando un paquete cuadrado y amárralo con cibaque.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Cocer",
        "description": "Acomódalos en una olla vaporera grande. Cocina tapados por hora y media. Son el almuerzo tradicional de los jueves junto con pan francés.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Cocción al vapor", "minutes": 90 }
      }
    ]
  },
  {
    "id": "horchata-chapina-1",
    "title": "Horchata Chapina",
    "description": "Bebida refrescante y dulcísima. A diferencia de la versión mexicana o española, la horchata guatemalteca se caracteriza por el uso de arroz crudo remojado molido junto con almendras, pepita de melón y abundante canela. Se sirve fría con leche.",
    "basePortions": 8,
    "category": "Bebida Fría",
    "difficulty": "Fácil",
    "prepTime": "Remojo nocturno",
    "cookTime": "15 min",
    "temperature": "Muy frío (con hielo)",
    "rating": 4.7,
    "author": "Refrescos Tradicionales",
    "utensils": ["Licuadora de alta potencia", "Colador o manta", "Pichel grande"],
    "tips": "El remojo previo del arroz es vital. Si puedes llevarlo a un molino de nixtamal en vez de licuadora, el polvo quedará más fino. Sírvase con abundante hielo picado.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Arroz blanco crudo", "qty": 1, "unit": "lb", "price": 5.00, "store": "Supermercado" },
      { "name": "Semillas de melón secas o pepitoria blanca", "qty": 2, "unit": "oz", "price": 4.00, "store": "Mercado" },
      { "name": "Almendras peladas", "qty": 2, "unit": "oz", "price": 10.00, "store": "Supermercado" },
      { "name": "Canela en raja grande", "qty": 3, "unit": "unidades", "price": 3.00, "store": "Mercado" },
      { "name": "Azúcar", "qty": 1, "unit": "lb", "price": 5.00, "store": "Supermercado" },
      { "name": "Leche entera y Leche evaporada", "qty": 1, "unit": "mix", "price": 15.00, "store": "Supermercado" },
      { "name": "Agua purificada", "qty": 2, "unit": "litros", "price": 0.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "El Remojo",
        "description": "Una noche antes, lava el arroz. Déjalo remojando en agua purificada junto con las ramas de canela despedazadas, las almendras y las semillas de melón.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Remojo", "minutes": 480 }
      },
      {
        "title": "Molienda Extrema",
        "description": "Pasa por la licuadora el arroz con las especias usando el agua del remojo. Licúa durante varios minutos hasta obtener un polvo líquido muy, muy fino.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Licuar", "minutes": 10 }
      },
      {
        "title": "El Colado",
        "description": "Cuela el líquido resultante pasándolo por un colador muy fino o una manta de cielo. Exprime bien para sacar toda la esencia y desecha la pasta o bagazo sobrante.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "Armar la Bebida",
        "description": "En un pichel grande, vierte la esencia de horchata extraída. Agrega el agua pura, la leche evaporada, la leche normal y endulza con azúcar al gusto. Sírvela bien fría.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "rosa-jamaica-1",
    "title": "Fresco de Rosa de Jamaica",
    "description": "La bebida oficial de los almuerzos chapines. Hecha a base de la flor del hibisco, proporciona un color rojo rubí intenso, un sabor ácido que limpia el paladar, y sirve como perfecto digestivo para acompañar caldos y carnes.",
    "basePortions": 10,
    "category": "Bebida Fría",
    "difficulty": "Fácil",
    "prepTime": "10 min",
    "cookTime": "15 min",
    "temperature": "Muy frío (con hielo)",
    "rating": 4.9,
    "author": "Casa Chapina",
    "utensils": ["Olla para hervir", "Colador grande", "Pichel de vidrio"],
    "tips": "No tires las flores después del primer hervor; a menudo puedes darles un segundo hervor más corto para extraer más sabor y color.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Flor de Rosa de Jamaica seca", "qty": 4, "unit": "oz", "price": 10.00, "store": "Mercado" },
      { "name": "Agua purificada", "qty": 3, "unit": "litros", "price": 0.00, "store": "Casa" },
      { "name": "Azúcar blanca", "qty": 1, "unit": "lb", "price": 5.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Limpieza y Hervor",
        "description": "Lava rápidamente las flores secas bajo el grifo de agua para quitarles el polvo. Ponlas a hervir en 1 litro de agua por unos 15 minutos. El agua se tornará casi negra de tan concentrada.",
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "timer": { "name": "Hervir flor", "minutes": 15 }
      },
      {
        "title": "Colado y Disolución",
        "description": "Cuela el concentrado caliente sobre el pichel y descarta las flores. Disuelve inmediatamente el azúcar en este extracto caliente (es más fácil).",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Servir",
        "description": "Añade el resto de los 2 litros de agua fría. Mezcla bien y ajusta el dulzor, debe ser un equilibrio perfecto entre lo ácido de la flor y el azúcar. Sírvelo en vasos con cubos de hielo.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "chirmol-1",
    "title": "Chirmol Tradicional (Salsa Asada)",
    "description": "No es pico de gallo, no es salsa verde. Es el Chirmol: el rey de la carne asada. Una salsa rústica hecha puramente de tomates asados y machacados (no licuados), mezclados con cilantro, cebolla picada y jugo de limón. Refrescante y ahumado.",
    "basePortions": 6,
    "category": "Salsa / Acompañamiento",
    "difficulty": "Fácil",
    "prepTime": "10 min",
    "cookTime": "15 min",
    "temperature": "Al tiempo",
    "rating": 5.0,
    "author": "Churrascos de Domingo",
    "utensils": ["Comal o parrilla al carbón", "Tenedor grande para machacar", "Tazón hondo"],
    "tips": "El auténtico chirmol NUNCA se licúa. Se machaca a mano para mantener los trozos de tomate asado y los pedacitos de piel tatemada (quemada) que le dan el sabor a carbón.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Tomates de cocina (maduros y firmes)", "qty": 8, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Cebolla (blanca o morada) finamente picada", "qty": 0.5, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Cilantro fresco picado", "qty": 0.5, "unit": "manojo", "price": 2.00, "store": "Mercado" },
      { "name": "Limones frescos", "qty": 2, "unit": "unidades", "price": 1.00, "store": "Mercado" },
      { "name": "Chile jalapeño o cobanero (opcional)", "qty": 1, "unit": "pizca", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "El Asado (Tatemado)",
        "description": "Asa los tomates enteros directamente en las brasas del carbón o en un comal súper caliente. Gíralos hasta que la piel esté completamente negra (tatemada) y el interior esté aguado. Retíralos.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Asar tomates", "minutes": 15 }
      },
      {
        "title": "Machacar",
        "description": "Coloca los tomates calientes en un tazón (no les quites la piel negra, o solo quita el exceso si es mucho). Usa un tenedor grande para machacarlos hasta formar un puré grueso con trozos grandes de tomate.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Mezcla Fresca",
        "description": "Agrega inmediatamente la cebolla picada, el cilantro fresco, sal al gusto y el jugo de limón recién exprimido. Mezcla bien y sirve como acompañamiento bañando una carne asada o longanizas.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "guacamol-chapin-1",
    "title": "Guacamol Chapín",
    "description": "Más sencillo y purista que el guacamole mexicano. En Guatemala el guacamol prescinde del tomate y los chiles excesivos, enfocándose puramente en la cremosidad del aguacate maduro, equilibrado con cebolla finamente picada, sal, orégano seco y limón.",
    "basePortions": 6,
    "category": "Acompañamiento",
    "difficulty": "Fácil",
    "prepTime": "10 min",
    "cookTime": "0 min",
    "temperature": "Frío o al tiempo",
    "rating": 4.8,
    "author": "Antojitos Diarios",
    "utensils": ["Tazón", "Tenedor", "Cuchillo"],
    "tips": "Para evitar que el guacamol se oxide (se ponga negro) si sobra, deja la semilla del aguacate dentro del tazón con la mezcla y exprime suficiente limón. No lo hagas en licuadora.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Aguacates grandes, maduros y de buena textura", "qty": 4, "unit": "unidades", "price": 20.00, "store": "Mercado" },
      { "name": "Cebolla finamente picada", "qty": 0.5, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Limones jugosos", "qty": 2, "unit": "unidades", "price": 1.00, "store": "Mercado" },
      { "name": "Sal y pimienta negra molida", "qty": 1, "unit": "pizca", "price": 0.50, "store": "Casa" },
      { "name": "Orégano seco triturado", "qty": 1, "unit": "pizca generosa", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "La Extracción",
        "description": "Abre los aguacates, saca la semilla y extrae toda la pulpa con una cuchara colocándola en un tazón amplio.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Majar (No Licuar)",
        "description": "Usa un tenedor para triturar la pulpa hasta obtener una pasta cremosa pero con algo de textura. Agrégale sal y el jugo de limón inmediatamente para preservar su color verde brillante.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Los Aromas",
        "description": "Incorpora la cebolla picada finamente y el orégano seco triturado con tus dedos. Revuelve y sirve de inmediato sobre tostadas de maíz, shucos, pan francés o como entrada con nachos.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  }
];

const filePath = 'src/lib/data/recipes.json';
const data = fs.readFileSync(filePath, 'utf8');
let currentRecipes = [];
try {
  currentRecipes = JSON.parse(data);
} catch (e) {
  console.error("Error parsing JSON:", e);
}

const newIds = newRecipes.map(r => r.id);
const filteredCurrent = currentRecipes.filter(r => !newIds.includes(r.id));
const combined = [...filteredCurrent, ...newRecipes];

fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
console.log(`Successfully appended batch 5. Total recipes now: ${combined.length}`);

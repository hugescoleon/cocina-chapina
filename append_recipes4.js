const fs = require('fs');

const newRecipes = [
  {
    "id": "panes-pollo-1",
    "title": "Panes con Pollo Tradicionales",
    "description": "El infaltable de los cumpleaños, convivios y fines de semana. Un pan francés grande (o pirujo) relleno de pechuga de pollo desmenuzada y bañada en un recado rojo suave, acompañado de mayonesa, repollo, remolacha y mostaza.",
    "basePortions": 10,
    "category": "Antojito / Plato fuerte",
    "difficulty": "Fácil",
    "prepTime": "30 min",
    "cookTime": "45 min",
    "temperature": "Caliente",
    "rating": 4.9,
    "author": "Recetas de Fiesta",
    "utensils": ["Olla", "Licuadora", "Sartén", "Tabla para picar"],
    "tips": "El pan debe ser 'francés grande' o pirujo para que soporte la humedad del recado sin romperse. La mezcla de mostaza y mayonesa untada en el pan es clave para el sabor característico.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Pechugas de pollo enteras", "qty": 3, "unit": "lb", "price": 45.00, "store": "Pollería" },
      { "name": "Panes franceses grandes o pirujos", "qty": 10, "unit": "unidades", "price": 10.00, "store": "Panadería" },
      { "name": "Tomates maduros", "qty": 2, "unit": "lb", "price": 10.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Ajo", "qty": 3, "unit": "dientes", "price": 1.00, "store": "Mercado" },
      { "name": "Chile pimiento rojo", "qty": 2, "unit": "unidades", "price": 4.00, "store": "Mercado" },
      { "name": "Hojas de laurel y tomillo", "qty": 1, "unit": "porción", "price": 2.00, "store": "Mercado" },
      { "name": "Mayonesa y mostaza", "qty": 1, "unit": "taza", "price": 10.00, "store": "Supermercado" },
      { "name": "Repollo en tiras (pasado por agua caliente)", "qty": 3, "unit": "tazas", "price": 5.00, "store": "Mercado" },
      { "name": "Remolacha cocida en rodajas (opcional)", "qty": 2, "unit": "unidades", "price": 4.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Cocción del Pollo",
        "description": "Hierve las pechugas de pollo en agua con sal, cebolla y ajo. Una vez cocidas y frías, desmenúzalas (deshiláchalas) en tiras no muy finas. Reserva el caldo.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Cocer pollo", "minutes": 30 }
      },
      {
        "title": "Salsa Roja Aromática",
        "description": "Hierve los tomates, cebolla, ajo y chile pimiento. Licúalos bien finos usando un poco del caldo de pollo. Cuela la mezcla directamente sobre una olla.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Guisado del Pollo",
        "description": "A la salsa roja agrega laurel, tomillo, sal y pimienta. Añade el pollo desmenuzado y deja hervir a fuego medio hasta que el pollo absorba la salsa y quede muy jugoso.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Guisar pollo", "minutes": 15 }
      },
      {
        "title": "Armado del Pan",
        "description": "Abre cada pan por la mitad. Unta mayonesa en una mitad y un toque de mostaza en la otra. Coloca una cama de repollo, luego sirve una cucharada generosa y muy jugosa del pollo guisado. Termina con rodajas de remolacha si gustas.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "torrejas-1",
    "title": "Torrejas Tradicionales",
    "description": "El postre rey de la Cuaresma y Semana Santa. Un pan dulce (mollete o pan de yemas) rebanado, capeado en huevo esponjoso, frito a la perfección y finalmente sumergido en un jarabe caliente de panela y canela.",
    "basePortions": 6,
    "category": "Postre Festivo",
    "difficulty": "Media",
    "prepTime": "20 min",
    "cookTime": "30 min",
    "temperature": "Caliente o al tiempo",
    "rating": 4.8,
    "author": "Dulces Cuaresmales",
    "utensils": ["Sartén honda", "Batidora", "Olla grande", "Papel absorbente"],
    "tips": "El pan debe estar 'dormido', es decir, de uno o dos días antes para que esté firme, absorba bien el huevo y no se deshaga al freírlo ni al bañarlo en el jarabe.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Panes de manteca o molletes medianos", "qty": 6, "unit": "unidades", "price": 12.00, "store": "Panadería" },
      { "name": "Huevos grandes", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Panela (rapadura)", "qty": 1, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Canela en raja, clavo de olor y pimienta gorda", "qty": 1, "unit": "mix", "price": 4.00, "store": "Mercado" },
      { "name": "Agua", "qty": 1, "unit": "litro", "price": 0.00, "store": "Casa" },
      { "name": "Aceite para freír", "qty": 2, "unit": "tazas", "price": 10.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "La Miel de Panela",
        "description": "En una olla grande, pon a hervir el agua con la panela y todas las especias aromáticas (canela, clavo, pimienta gorda). Deja reducir a fuego medio hasta crear un almíbar ligero pero pegajoso.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Hervir miel", "minutes": 20 }
      },
      {
        "title": "Preparar el Pan y el Huevo",
        "description": "Rebana un poco la corteza superior e inferior de los panes (opcional). Separa las claras de las yemas. Bate las claras a punto de nieve firme y luego incorpora las yemas suavemente.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "El Fritado (Capeado)",
        "description": "Calienta el aceite. Sumerge cada pan en el huevo batido asegurando que quede completamente cubierto. Fríelos rápidamente dándoles vuelta hasta que queden dorados e inflados. Escurre en papel toalla.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír panes", "minutes": 10 }
      },
      {
        "title": "El Baño Dulce",
        "description": "Introduce los panes ya fritos dentro de la olla con la miel de panela hirviendo. Déjalos absorber el jarabe a fuego mínimo por un par de minutos. Sirve con abundante miel por encima.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "molletes-1",
    "title": "Molletes Rellenos de Manjar",
    "description": "Son los hermanos sofisticados de las torrejas. La principal diferencia radica en que a los molletes se les corta una 'tapita', se vacían un poco y se rellenan con un espeso manjar de vainilla o leche, para luego sellarlos, capearlos y bañarlos en miel.",
    "basePortions": 6,
    "category": "Postre Festivo",
    "difficulty": "Avanzada",
    "prepTime": "40 min",
    "cookTime": "30 min",
    "temperature": "Caliente o frío",
    "rating": 5,
    "author": "Repostería Cuaresmal",
    "utensils": ["Cuchillo pequeño", "Batidora", "Sartén honda", "Olla"],
    "tips": "El manjar del relleno debe estar completamente frío y firme antes de rellenar los panes, de lo contrario se saldrá por los bordes al momento de freír.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Panes molletes grandes y firmes", "qty": 6, "unit": "unidades", "price": 15.00, "store": "Panadería" },
      { "name": "Leche (para el manjar)", "qty": 2, "unit": "tazas", "price": 6.00, "store": "Supermercado" },
      { "name": "Maicena (fécula de maíz)", "qty": 3, "unit": "cda", "price": 2.00, "store": "Abarrotería" },
      { "name": "Azúcar y vainilla (para el manjar)", "qty": 1, "unit": "mix", "price": 3.00, "store": "Casa" },
      { "name": "Huevos grandes (para el capeado)", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Panela, canela y agua (para la miel)", "qty": 1, "unit": "mix", "price": 10.00, "store": "Mercado" },
      { "name": "Pasas (opcional para adornar)", "qty": 2, "unit": "oz", "price": 3.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "El Manjar de Relleno",
        "description": "Disuelve la maicena en un poco de leche fría. Pon el resto de la leche a hervir con azúcar y vainilla. Agrega la maicena disuelta sin dejar de mover hasta crear una crema espesa. Deja enfriar completamente.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Enfriar manjar", "minutes": 30 }
      },
      {
        "title": "El Relleno Quirúrgico",
        "description": "Corta la parte superior (sombrerito) de cada mollete sin separarlo del todo. Saca con cuidado un poco de la miga del centro. Rellena el hueco con el manjar frío y un par de pasas. Cierra el sombrerito firmemente.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "El Capeado Perfecto",
        "description": "Bate las claras a punto de nieve y luego integra las yemas. Sumerge los panes rellenos en el huevo asegurando que la abertura quede bien sellada por la espuma. Fríelos en aceite caliente hasta dorar.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "La Fusión Dulce",
        "description": "Haz la miel de panela igual que la de las torrejas. Introduce los molletes fritos y escurridos en la miel caliente. Sírvelos enteros, al partirlos el manjar sorprenderá al comensal.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "empanadas-manjar-1",
    "title": "Empanadas de Manjar de Leche",
    "description": "Crujientes empanaditas de masa de sal, rellenas de un suave y dulce manjar de leche o vainilla. El contraste de la textura exterior tostada (pintada de rojo con colorante o achiote) con el interior dulce las hace el antojo perfecto con un café de la tarde.",
    "basePortions": 10,
    "category": "Postre / Refacción",
    "difficulty": "Media",
    "prepTime": "40 min",
    "cookTime": "20 min",
    "temperature": "Horno o sartén",
    "rating": 4.6,
    "author": "Antojitos Típicos",
    "utensils": ["Rodillo", "Sartén u Horno", "Brocha de cocina"],
    "tips": "Puedes hacer la masa con harina de trigo (tipo pie) o con mezcla de masa de maíz y trigo para un toque más rústico. Cierra muy bien los bordes con un tenedor o con 'repulgue' manual.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Harina de trigo o Masa de maíz preparada", "qty": 2, "unit": "tazas", "price": 6.00, "store": "Supermercado" },
      { "name": "Manteca vegetal o margarina", "qty": 0.5, "unit": "taza", "price": 4.00, "store": "Supermercado" },
      { "name": "Agua fría con pizca de sal", "qty": 1, "unit": "mix", "price": 0.00, "store": "Casa" },
      { "name": "Manjar de leche (ya preparado y firme)", "qty": 1.5, "unit": "tazas", "price": 10.00, "store": "Casa" },
      { "name": "Achiote líquido o colorante rojo vegetal", "qty": 1, "unit": "cucharadita", "price": 2.00, "store": "Abarrotería" },
      { "name": "Azúcar glass o normal para espolvorear", "qty": 0.5, "unit": "taza", "price": 3.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Amasado de la Costra",
        "description": "Mezcla la harina con la manteca usando las puntas de los dedos hasta formar migas. Agrega poco a poco agua fría amasando hasta formar una bola lisa que no se pegue. Deja reposar la masa cubierta por 20 minutos.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Reposo", "minutes": 20 }
      },
      {
        "title": "Rellenar con Cuidado",
        "description": "Estira porciones de masa formando círculos. Pon una cucharada de manjar (muy firme y frío) en el centro. Dobla a la mitad y sella fuertemente los bordes apretando o usando un tenedor para evitar fugas.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "El Toque Visual",
        "description": "Diluye un poco de achiote en agua o huevo y usa una brocha o algodón para 'pintar' manchas rojas sobre las empanadas, dándoles ese look tradicional inconfundible.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "Cocción y Azúcar",
        "description": "Hornéalas a 350°F (175°C) hasta que estén doradas (o fríelas si la masa es de maíz). Al sacarlas, mientras están calientes, espolvoréalas con azúcar. Sírvelas tibias.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Hornear", "minutes": 20 }
      }
    ]
  },
  {
    "id": "tiras-panza-1",
    "title": "Tiras de Panza",
    "description": "Un guiso denso y exquisito para los amantes de las texturas diferentes. La panza (callos o estómago de res) se hierve hasta quedar extremadamente suave y se guisa en un recado rojo de tomate espeso, similar al revolcado.",
    "basePortions": 6,
    "category": "Plato fuerte",
    "difficulty": "Avanzada",
    "prepTime": "30 min",
    "cookTime": "120 min",
    "temperature": "Hervor lento",
    "rating": 4.4,
    "author": "Cocina de Mercado",
    "utensils": ["Olla de presión", "Comal", "Licuadora", "Olla grande"],
    "tips": "El secreto absoluto es la limpieza de la panza: lávala varias veces frotándola con sal gruesa, limón y vinagre, y enjuágala exhaustivamente antes de la primera cocción para quitar olores fuertes.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Panza de res (limpia)", "qty": 3, "unit": "lb", "price": 45.00, "store": "Carnicería" },
      { "name": "Limón, vinagre y sal gruesa (para limpieza)", "qty": 1, "unit": "mix", "price": 5.00, "store": "Casa" },
      { "name": "Tomate de cocina", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Miltomate", "qty": 4, "unit": "oz", "price": 3.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Ajo", "qty": 3, "unit": "dientes", "price": 1.00, "store": "Mercado" },
      { "name": "Chile guaque (seco)", "qty": 2, "unit": "unidades", "price": 3.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Cocción Prolongada",
        "description": "Una vez súper limpia, cuece la panza en la olla de presión con agua, sal, ajo, media cebolla y hierbabuena hasta que quede tan suave que casi se deshaga. Retira del caldo, déjala enfriar y córtala en tiras delgadas.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Olla de presión", "minutes": 60 }
      },
      {
        "title": "Recado Tatemado",
        "description": "En un comal, asa los tomates, miltomates, ajo, la otra mitad de la cebolla y los chiles guaque desvenados. Licúa todo usando un poco del caldo limpio de la cocción de la panza.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "El Guiso",
        "description": "En una olla, sofríe el recado licuado en un hilo de aceite. Una vez frito y oscuro, agrega las tiras de panza. Deja hervir a fuego lento por 15 minutos para que la panza absorba el sabor.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Hervor final", "minutes": 15 }
      }
    ]
  },
  {
    "id": "caldo-mariscos-1",
    "title": "Caldo de Mariscos Chapín",
    "description": "También conocido como sopa de mariscos. A diferencia del Tapado, este no lleva leche de coco ni plátano. Es un caldo base muy potente, anaranjado por el tomate y el achiote, y repleto de una mezcla contundente de frutos del mar, cilantro y limón.",
    "basePortions": 4,
    "category": "Sopa",
    "difficulty": "Media",
    "prepTime": "25 min",
    "cookTime": "35 min",
    "temperature": "Caliente",
    "rating": 5,
    "author": "Marisquerías del Sur",
    "utensils": ["Olla grande", "Licuadora"],
    "tips": "No sobrecozas los mariscos. Los pescados de carne blanca y los camarones requieren apenas de 5 a 8 minutos de hervor. Agrega el cilantro fresco y abundante jugo de limón directamente al tazón al servir.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Pescado entero en trozos grandes (pargo o curvina)", "qty": 1.5, "unit": "lb", "price": 30.00, "store": "Pescadería" },
      { "name": "Mezcla de mariscos (camarón con cáscara, calamar, caracol, jaibas)", "qty": 2, "unit": "lb", "price": 60.00, "store": "Pescadería" },
      { "name": "Tomates maduros", "qty": 2, "unit": "lb", "price": 10.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Ajo", "qty": 4, "unit": "dientes", "price": 1.00, "store": "Mercado" },
      { "name": "Achiote y consomé de camarón (opcional)", "qty": 1, "unit": "mix", "price": 5.00, "store": "Supermercado" },
      { "name": "Cilantro fresco y limones (para servir)", "qty": 1, "unit": "mix", "price": 8.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "El Fondo Sofrito",
        "description": "En la olla grande, sofríe cebolla, ajo y todo el tomate finamente picado o licuado. Cocina hasta hacer un puré o 'chirmol' muy concentrado. Agrega el achiote para un color naranja vivo.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Sofreír base", "minutes": 10 }
      },
      {
        "title": "Cocción de las Jaibas",
        "description": "Agrega unos 2 litros de agua al sofrito base y lleva a ebullición. Primero incorpora las jaibas (cangrejos) partidas a la mitad y bien lavadas, ya que son las que más tardan y aportan gran sabor al caldo.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Hervir jaibas", "minutes": 15 }
      },
      {
        "title": "Agregando los Mariscos Suaves",
        "description": "Cuando la jaiba esté roja, ajusta la sal. Agrega los trozos de pescado, el calamar y por último los camarones. Baja el fuego y tapa. A los 8 minutos máximo, apaga el fuego. ¡Están listos!",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "ensalada-escabeche-1",
    "title": "Ensalada de Escabeche Chapín",
    "description": "La compañera crujiente e indispensable de un buen plato de carne asada o de unas chilaquilas. Es una mezcla de zanahorias, coliflor, ejotes, chiles jalapeños y cebolla morada, crujientes y encurtidos en un baño aromático de vinagre, tomillo, orégano y laurel.",
    "basePortions": 10,
    "category": "Acompañamiento",
    "difficulty": "Fácil",
    "prepTime": "30 min",
    "cookTime": "15 min",
    "temperature": "Frío",
    "rating": 4.7,
    "author": "Cocina Diaria",
    "utensils": ["Recipiente grande de vidrio con tapa", "Olla grande", "Cuchillo", "Colador"],
    "tips": "El blanqueado es el secreto del éxito: las verduras deben meterse al agua hirviendo y sacarse antes de que se ablanden por completo, cortando la cocción inmediatamente con agua fría para que el escabeche truene al morderlo.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Zanahorias grandes cortadas en diagonal (sesgadas)", "qty": 4, "unit": "unidades", "price": 8.00, "store": "Mercado" },
      { "name": "Coliflor cortada en floretes pequeños", "qty": 1, "unit": "cabeza", "price": 10.00, "store": "Mercado" },
      { "name": "Ejotes cortados a la mitad", "qty": 0.5, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Cebollas moradas o blancas pequeñas, enteras o en cuartos", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Chiles jalapeños cortados en rajas gruesas", "qty": 4, "unit": "unidades", "price": 5.00, "store": "Mercado" },
      { "name": "Vinagre de manzana o blanco", "qty": 1.5, "unit": "taza", "price": 8.00, "store": "Supermercado" },
      { "name": "Aceite de oliva o vegetal", "qty": 0.5, "unit": "taza", "price": 10.00, "store": "Supermercado" },
      { "name": "Orégano seco, hojas de laurel frescas, tomillo, granos de pimienta negra", "qty": 1, "unit": "mix", "price": 8.00, "store": "Mercado" },
      { "name": "Ajo pelado entero", "qty": 6, "unit": "dientes", "price": 2.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "El Blanqueado de Verduras (Crujientes)",
        "description": "Hierve una olla grande con agua y bastante sal. Introduce la coliflor, zanahorias, ejotes y cebollas. Déjalos hervir EXACTAMENTE por 4 minutos. Sácalos con espumadera y sumérgelos de inmediato en un tazón de agua con hielo para detener la cocción.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Blanquear", "minutes": 4 }
      },
      {
        "title": "Sofrito Aromático de Chiles y Especias",
        "description": "En una olla grande a fuego medio, pon el aceite y sofríe los ajos enteros, los chiles jalapeños en rajas, el laurel, el tomillo y los granos de pimienta. Cocina por unos 3 minutos hasta que el aceite perfume el aire, pero no dejes que el ajo se queme.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Aromatizar aceite", "minutes": 3 }
      },
      {
        "title": "El Baño Encurtido",
        "description": "A la misma olla con aceite aromatizado, añádele el vinagre con cuidado (puede saltar). Añade sal al gusto, un toque muy sutil de azúcar (para balancear acidez), y luego incorpora todas las verduras escurridas. Mezcla rápidamente por 1 minuto en el fuego para que se calienten un poco y apaga el fuego. Espolvorea abundante orégano molido con tus manos.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      },
      {
        "title": "Reposo y Guardado",
        "description": "Acomoda todo apretadamente en uno o dos frascos grandes de vidrio esterilizados (o tazón tapado) e inunda con todo el líquido sobrante. Deja enfriar a temperatura ambiente y luego guarda en refrigeración al menos 24 horas antes de comer. ¡Entre más días pasen, mejor sabor!",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "chuchitos-cambray-1",
    "title": "Chuchitos de Cambray (Dulces)",
    "description": "La versión rosada y dulce de nuestros amados tamalitos. Estos son más pequeños que los colorados, su masa está hecha de arroz o de maíz muy suave coloreada con un tono rojo/rosado carmín, y en su interior esconden un picadillo dulce de frutas y carne de cerdo caramelizada, adornados con pasitas y almendras.",
    "basePortions": 15,
    "category": "Postre / Antojito Dulce",
    "difficulty": "Avanzada",
    "prepTime": "60 min",
    "cookTime": "60 min",
    "temperature": "Vapor a fuego medio",
    "rating": 4.8,
    "author": "Antojitos Típicos",
    "utensils": ["Vaporera pequeña", "Tazón hondo", "Comal"],
    "tips": "Su amarre es único: se envuelven en tusa pero se amarran fuertemente de ambos extremos como si fueran un dulce (o caramelo), dejando el centro 'gordito'. Usa masa de arroz para una textura superior.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Masa de arroz (o de maíz muy fina)", "qty": 1.5, "unit": "lb", "price": 12.00, "store": "Molino o Supermercado" },
      { "name": "Manteca de cerdo y mantequilla", "qty": 8, "unit": "oz", "price": 10.00, "store": "Mercado" },
      { "name": "Azúcar", "qty": 1, "unit": "taza", "price": 5.00, "store": "Supermercado" },
      { "name": "Colorante vegetal rojo o carmín", "qty": 1, "unit": "cdita", "price": 3.00, "store": "Abarrotería" },
      { "name": "Carne de cerdo (posta picadísima cocida con canela y clavo)", "qty": 0.5, "unit": "lb", "price": 15.00, "store": "Carnicería" },
      { "name": "Pasas y Almendras fileteadas", "qty": 1, "unit": "mix", "price": 12.00, "store": "Supermercado" },
      { "name": "Hojas de tusa seca (hidratadas en agua caliente)", "qty": 1, "unit": "manojo", "price": 5.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "La Masa Dulce y Rosada",
        "description": "En un recipiente amplio, integra la masa de arroz con la manteca derretida, la mantequilla, el azúcar y una pizca de sal. Agrega el colorante vegetal hasta que la masa tome un hermoso tono rosado uniforme. Amasa hasta que esté untuosa.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "El Relleno Festivo",
        "description": "Mezcla la carne de cerdo (ya cocida muy finamente picada), con las pasas y almendras. En las recetas más antiguas, este picadillo se sofríe ligeramente con panela derretida.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "El Amarre de Caramelo",
        "description": "Extiende una hoja de tusa (maíz) previamente remojada. Coloca en el centro una bolita de masa, haz una depresión y coloca una cucharadita del relleno dulce. Cierra la tusa como un tubo grueso, y luego amarra los dos extremos muy apretados, simulando la envoltura de un dulce.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Al Vapor",
        "description": "Colócalos en la olla vaporera con cuidado. Cocina por una hora. Estos tamalitos son una explosión dulce y aromática, perfectos para acompañar con un ponche de frutas caliente.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Vaporera", "minutes": 60 }
      }
    ]
  },
  {
    "id": "frijoles-colorados-chicharron-1",
    "title": "Frijoles Colorados con Chicharrón",
    "description": "Un guiso denso y sabroso que protagoniza la mesa de las familias del oriente de Guatemala. El frijol colorado aporta una textura firme que se balancea con un recado de tomate y el inigualable sabor tostado y grasoso de grandes trozos de chicharrón de cerdo que se rehidratan y ablandan en el caldo.",
    "basePortions": 6,
    "category": "Plato Fuerte",
    "difficulty": "Media",
    "prepTime": "Cargar noche anterior",
    "cookTime": "75 min",
    "temperature": "Hervor lento",
    "rating": 4.8,
    "author": "Cocina Hogareña",
    "utensils": ["Olla de presión", "Sartén", "Licuadora", "Olla grande"],
    "tips": "Consigue chicharrón 'carnudo' (con una capa de carne pegada a la grasa y piel crujiente) en la carnicería local. Debe estar fresco. Añádelo en los últimos 20 minutos de cocción para que se ponga suave pero no se deshaga del todo.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Frijoles colorados grandes, limpios (secos)", "qty": 1, "unit": "lb", "price": 12.00, "store": "Mercado" },
      { "name": "Chicharrones carnudos en trozos grandes", "qty": 1, "unit": "lb", "price": 40.00, "store": "Carnicería o Chicharronera" },
      { "name": "Tomates maduros grandes", "qty": 4, "unit": "unidades", "price": 6.00, "store": "Mercado" },
      { "name": "Cebolla blanca", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Dientes de ajo", "qty": 3, "unit": "unidades", "price": 1.00, "store": "Casa" },
      { "name": "Sal", "qty": 1, "unit": "cucharada", "price": 0.50, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Cocción Primaria",
        "description": "Luego de remojar los frijoles toda la noche en agua fría, lávalos y ponlos en la olla de presión con agua limpia cubriendo unos dedos por encima, sal y media cebolla. Cocina hasta que estén suaves pero no deshechos (al dente).",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Olla de presión", "minutes": 40 }
      },
      {
        "title": "Chirmol Base",
        "description": "Asa o hierve los tomates, el ajo y la otra mitad de la cebolla. Licúalos sin agua para lograr una salsa espesa. Sofríe rápidamente esta salsa en una sartén con un hilo de aceite o manteca.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "La Magia del Chicharrón",
        "description": "En una olla tradicional, vierte los frijoles colorados ya cocidos con parte de su caldo. Incorpora el sofrito de tomate. Revuelve, prueba la sazón e incorpora los trozos de chicharrón. Baja el fuego.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      },
      {
        "title": "Espesado y Reposo",
        "description": "Deja hervir todo destapado a fuego lento. El chicharrón soltará su sabor en el caldo y su piel crujiente se tornará blanda y gelatinosa, un deleite absoluto. Sirve acompañado de arroz blanco.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Hervor final", "minutes": 20 }
      }
    ]
  },
  {
    "id": "huevos-divorciados-1",
    "title": "Huevos Divorciados Chapines",
    "description": "Un desayuno majestuoso para mañanas largas. Son dos huevos estrellados servidos sobre tortillas de maíz tostadas o fritas, pero separados (divorciados) en el plato por un imponente muro o caminito de frijoles volteados espesos. Un huevo es bañado en una ardiente salsa verde de miltomate y el otro en una dulce y picante salsa roja de tomate.",
    "basePortions": 1,
    "category": "Desayuno",
    "difficulty": "Media",
    "prepTime": "15 min",
    "cookTime": "15 min",
    "temperature": "Recién hecho",
    "rating": 5,
    "author": "Desayunos Clásicos",
    "utensils": ["Sartén de teflón para huevos", "2 ollas pequeñas para salsas", "Espátula"],
    "tips": "El secreto visual está en las salsas: asegúrate de que la salsa verde de miltomate pique sabroso, y que la salsa roja contraste con un dulzor sutil. El huevo estrellado ideal debe tener la orilla crocante (puntilla) y la yema tierna y líquida.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Huevos grandes frescos", "qty": 2, "unit": "unidades", "price": 4.00, "store": "Mercado" },
      { "name": "Tortillas de maíz delgadas o pre-tostadas", "qty": 2, "unit": "unidades", "price": 1.00, "store": "Tortillería" },
      { "name": "Frijoles negros volteados espesos", "qty": 0.5, "unit": "taza", "price": 4.00, "store": "Casa" },
      { "name": "Salsa verde casera (miltomate, ajo, cilantro, jalapeño licuado y sofrito)", "qty": 0.5, "unit": "taza", "price": 5.00, "store": "Casa" },
      { "name": "Salsa roja casera (chirmol de tomate asado)", "qty": 0.5, "unit": "taza", "price": 5.00, "store": "Casa" },
      { "name": "Aceite, sal y pimienta", "qty": 1, "unit": "mix", "price": 1.00, "store": "Casa" },
      { "name": "Plátanos fritos en tajadas (para acompañar)", "qty": 1, "unit": "mitad", "price": 3.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Las Bases y Salsas",
        "description": "Calienta en sartenes u ollitas pequeñas tus tres elementos clave: La salsa verde, la salsa roja y los frijoles volteados. Por aparte, en un sartén con una cucharada de aceite, fríe ligeramente las dos tortillas hasta que doren sin quemarse.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Estrellar Huevos",
        "description": "En un buen sartén antiadherente con un chorrito de aceite bien caliente, fríe los dos huevos (estrellados al gusto). Échales sal fina encima de la yema.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír huevos", "minutes": 3 }
      },
      {
        "title": "Armar la Separación",
        "description": "En un plato plano y ancho, coloca las dos tortillas fritas una al lado de la otra, con algo de separación. En medio de ellas construye una línea gruesa (un muro fronterizo) usando el puré de frijoles volteados calientes.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "El Divorcio",
        "description": "Coloca cuidadosamente un huevo estrellado sobre cada tortilla. Baña agresiva y generosamente un huevo con la ardiente salsa verde, y baña el otro huevo con la espesa y dulce salsa roja, asegurando que los colores se mantengan separados por la barrera de frijol negro. Acompaña con rodajas de plátano frito y pan recién tostado.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
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
console.log(`Successfully appended batch 4. Total recipes now: ${combined.length}`);

const fs = require('fs');

const newRecipes = [
  {
    "id": "tamarindo-1",
    "title": "Fresco de Tamarindo",
    "description": "El refresco clásico y agridulce que no falta en los mercados de Guatemala. Hecho con la vaina natural del tamarindo, es una bebida espesa, color café, sumamente refrescante para los climas cálidos y que combina perfecto con garnachas o empanadas.",
    "basePortions": 8,
    "category": "Bebida Fría",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "10 min",
    "temperature": "Frío (con hielo)",
    "rating": 4.6,
    "author": "Refrescos de Mercado",
    "utensils": ["Olla", "Colador grueso", "Pichel"],
    "tips": "Para extraer toda la pulpa, usa tus manos (muy limpias) para restregar las semillas en el agua, es la técnica tradicional y más efectiva.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Vainas de tamarindo fresco peladas", "qty": 1, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Agua purificada", "qty": 3, "unit": "litros", "price": 0.00, "store": "Casa" },
      { "name": "Azúcar", "qty": 1, "unit": "lb", "price": 5.00, "store": "Supermercado" }
    ],
    "steps": [
      {
        "title": "Hervir para Suavizar",
        "description": "Lava las vainas peladas. Ponlas a hervir en 1 litro de agua durante unos 10 minutos para que la pulpa se ablande y se separe de las semillas.",
        "imageUrl": "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "timer": { "name": "Hervir", "minutes": 10 }
      },
      {
        "title": "La Extracción Manual",
        "description": "Deja enfriar el agua con el tamarindo. Con tus manos, estruja vigorosamente las semillas contra el agua para soltar toda la pulpa espesa.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Colado y Endulzado",
        "description": "Pasa esta mezcla por un colador grueso directo al pichel. Añade el azúcar a este concentrado y disuélvela bien. Finalmente, agrega los otros 2 litros de agua fría y sirve con abundante hielo.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "frijoles-volteados-1",
    "title": "Frijoles Volteados Negros",
    "description": "El acompañamiento obligatorio en toda mesa chapina. Frijoles negros colados o licuados, fritos pacientemente en aceite o manteca hasta que se evaporan sus líquidos y se forma una masa brillante, espesa y con forma de rollo ('volteado').",
    "basePortions": 6,
    "category": "Acompañamiento",
    "difficulty": "Media",
    "prepTime": "10 min",
    "cookTime": "25 min",
    "temperature": "Caliente",
    "rating": 5.0,
    "author": "Cocina Diaria",
    "utensils": ["Sartén grande (preferible teflón o hierro)", "Paleta de madera", "Licuadora"],
    "tips": "El secreto de un buen frijol volteado es no dejar de mover la paleta de madera. Si te detienes, el frijol empezará a saltar agresivamente (quemando tus brazos) y se pegará al fondo.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Frijoles negros cocidos (con su caldo)", "qty": 3, "unit": "tazas", "price": 5.00, "store": "Casa" },
      { "name": "Cebolla", "qty": 0.5, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Aceite vegetal o manteca de cerdo", "qty": 0.5, "unit": "taza", "price": 5.00, "store": "Casa" },
      { "name": "Ajo (opcional)", "qty": 1, "unit": "diente", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Licuado del Frijol",
        "description": "Licúa los frijoles cocidos junto con un poco de su caldo hasta que quede un puré fino sin cáscaras enteras. Si te gustan rústicos, puedes solo machacarlos.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Licuar", "minutes": 5 }
      },
      {
        "title": "Sofreír Aromáticos",
        "description": "En un sartén grande, calienta muy bien el aceite o manteca. Fríe la cebolla finamente picada (y el ajo) hasta que estén casi quemados, para dar sabor al aceite.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Freír cebolla", "minutes": 5 }
      },
      {
        "title": "El Proceso de 'Volteo'",
        "description": "Vierte el frijol licuado al sartén con aceite caliente (cuidado porque salta). Cocina a fuego medio-alto moviendo constantemente con la paleta. El frijol espesará poco a poco, despegándose de las orillas y el fondo hasta formar un rollo que puedes 'voltear' entero con la paleta.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Mover el frijol", "minutes": 15 }
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
console.log(`Successfully appended 2 more recipes. Total recipes now: ${combined.length}`);

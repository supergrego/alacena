export class StaticDataService {

  dishes = [{ id: 1, day: 1, dish: "Lentejas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 2, day: 1, dish: "Macarrones con tomate", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 3, day: 1, dish: "Carne en salsa con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 4, day: 1, dish: "Pescado frito con guarnición", garrison_type: 1, with_fish: true, as_garrison: false },
    { id: 5, day: 2, dish: "Marmitaco", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 6, day: 2, dish: "Paella", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 7, day: 2, dish: "Huevos rellenos con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 8, day: 2, dish: "Carne empanada con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 9, day: 3, dish: "Puchero con habichuelas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 10, day: 3, dish: "Sopa de picadillo", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 11, day: 3, dish: "Quiche con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 12, day: 3, dish: "Lomo con papas fritas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 13, day: 4, dish: "Cazuela de fideos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 14, day: 4, dish: "Pastel de papas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 15, day: 4, dish: "Pescadilla a la gijonesa", garrison_type: 1, with_fish: true, as_garrison: false },
    { id: 16, day: 4, dish: "Pechuga de pollo con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 17, day: 5, dish: "Potaje de habichuelas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 18, day: 5, dish: "Arroz a la cubana", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 19, day: 5, dish: "Croquetas con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 20, day: 5, dish: "Jamón asado con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 21, day: 6, dish: "Estofado de ternera", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 22, day: 6, dish: "Menestra con huevos fritos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 23, day: 6, dish: "Huevos a la flamenca", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 24, day: 6, dish: "Pollo en salsa con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 25, day: 7, dish: "Lentejas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 26, day: 7, dish: "Arroz con champiñones", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 27, day: 7, dish: "Chuleta al horno con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 28, day: 7, dish: "Merluza a la vasca con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 29, day: 8, dish: "Sopa de verduras", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 30, day: 8, dish: "Espaguetis de la abuela", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 31, day: 8, dish: "Plato alpujarreño", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 32, day: 8, dish: "Albóndigas de bacalao con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 33, day: 9, dish: "Potaje de garbanzos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 34, day: 9, dish: "Crema de calabacín", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 35, day: 9, dish: "Tortilla de papas", garrison_type: 2, with_fish: false, as_garrison: false },
    { id: 36, day: 9, dish: "Albóndigas con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 37, day: 10, dish: "Sopa sevillana", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 38, day: 10, dish: "Potaje de habichuelas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 39, day: 10, dish: "Cuscús", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 40, day: 10, dish: "Pollo al ajillo con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 41, day: 11, dish: "Puchero con arroz", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 42, day: 11, dish: "Macarrones con tomate", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 43, day: 11, dish: "Huevos rellenos de atún", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 44, day: 11, dish: "Carne empanada con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 45, day: 12, dish: "Papas a la riojana", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 46, day: 12, dish: "Lasaña", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 47, day: 12, dish: "Empanadillas de atún con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 48, day: 12, dish: "Pechuga de pollo al jerez con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 49, day: 13, dish: "Lentejas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 50, day: 13, dish: "Ensalada de pollo", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 51, day: 13, dish: "Sanjacobo con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 52, day: 13, dish: "Jamón asado con guanición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 53, day: 14, dish: "Tortilla de papas", garrison_type: 2, with_fish: false, as_garrison: false },
    { id: 54, day: 14, dish: "Cazuela de fideos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 55, day: 14, dish: "Espinacas con bechamel", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 56, day: 14, dish: "Croquetas con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 57, day: 15, dish: "Papas con almendras", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 58, day: 15, dish: "Pisto con huevos fritos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 59, day: 15, dish: "Pescadilla a la gijonesa", garrison_type: 1, with_fish: true, as_garrison: false },
    { id: 60, day: 15, dish: "Lomo a la plancha con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 61, day: 16, dish: "Potaje de habichuelas", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 62, day: 16, dish: "Guisantes con jamón y huevos fritos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 63, day: 16, dish: "Lomo a la marinera con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 64, day: 16, dish: "Filetes rellenos con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 65, day: 17, dish: "Ensalada de pasta", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 66, day: 17, dish: "Estofado de ternera", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 67, day: 17, dish: "Pechuga de pollo con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 68, day: 17, dish: "Pescado en salsa verde con guarnición", garrison_type: 1, with_fish: true, as_garrison: false },
    { id: 69, day: 18, dish: "Puchero de col", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 70, day: 18, dish: "Papas a lo pobre con huevos", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 71, day: 18, dish: "Quiche con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 72, day: 18, dish: "Lomo a la cerveza con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 73, day: 19, dish: "Arroz a la campensina", garrison_type: 0, with_fish: false, as_garrison: true },
    { id: 74, day: 19, dish: "Papas con pescado", garrison_type: 0, with_fish: true, as_garrison: false },
    { id: 75, day: 19, dish: "Carne almendrada con guarnición", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 76, day: 19, dish: "Sardinas al horno con guarnición", garrison_type: 1, with_fish: true, as_garrison: false },
    { id: 77, day: 20, dish: "Migas de pan", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 78, day: 20, dish: "Crema de calabacín", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 79, day: 20, dish: "Pescado frito con remojón", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 80, day: 20, dish: "Pollo en salsa de almendras", garrison_type: 1, with_fish: false, as_garrison: false },
    { id: 81, day: 21, dish: "Papas con choco", garrison_type: 0, with_fish: true, as_garrison: false },
    { id: 82, day: 21, dish: "Pastel de arroz", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 83, day: 21, dish: "Costillas con calabacín", garrison_type: 0, with_fish: false, as_garrison: false },
    { id: 84, day: 21, dish: "Filete de merluza con guarnición", garrison_type: 1, with_fish: true, as_garrison: false }    
  ];

  plates = [{ id: 1, plate: "Pollo asado", half: 4.10 , entire: 8.10 , combo: false, garrison_type: 0, with_fish: false },
  { id: 2, plate: "Croquetas de pollo", half: 2.10 , entire: 4.20 , combo: true, garrison_type: 1, with_fish: false },
  { id: 3, plate: "Croquetas de espinacas", half: 2.10 , entire: 4.20 , combo: true, garrison_type: 1, with_fish: false },
  { id: 4, plate: "Empanadillas", half: 2.10 , entire: 4.20 , combo: true, garrison_type: 1, with_fish: false },
  { id: 5, plate: "Tortilla", half: null, entire: 3.60 , combo: true, garrison_type: 2, with_fish: false },
  { id: 6, plate: "Albóndigas", half: 2.60 , entire: 5.00 , combo: true, garrison_type: 1, with_fish: false },
  { id: 7, plate: "Muslo pollo asado", half: 2.30 , entire: null, combo: true, garrison_type: 1, with_fish: false },
  { id: 8, plate: "Pechuga pollo asada", half: 2.30 , entire: null, combo: true, garrison_type: 1, with_fish: false },
  { id: 9, plate: "Filetes de pechuga", half: null , entire: null, combo: true, garrison_type: 1, with_fish: false },
  { id: 10, plate: "Carne en salsa", half: 2.60 , entire: 4.90 , combo: true, garrison_type: 1, with_fish: false },
  { id: 11, plate: "Cazon", half: 2.70 , entire: 5.10 , combo: true, garrison_type: 1, with_fish: true },
  { id: 12, plate: "Alitas de pollo (8 ud.)", half: null, entire: 4.00 , combo: false, garrison_type: 0, with_fish: false },
  { id: 13, plate: "Patatas fritas", half: 1.70 , entire: 3.40 , combo: false, garrison_type: 1, with_fish: false },
  { id: 14, plate: "Patatas a lo pobre", half: 2.00 , entire: 3.70 , combo: false, garrison_type: 1, with_fish: false },
  { id: 15, plate: "Menestra", half: 2.00 , entire: 3.70 , combo: false, garrison_type: 1, with_fish: false },
  { id: 16, plate: "Pisto", half: 1.70 , entire: 3.20 , combo: false, garrison_type: 1, with_fish: false },
  { id: 17, plate: "Ensalada de arroz", half: 1.90 , entire: 3.60 , combo: false, garrison_type: 2, with_fish: false },
  { id: 18, plate: "Ensalada de habichuelas", half: 1.50 , entire: 3.60 , combo: false, garrison_type: 2, with_fish: false },
  { id: 19, plate: "Ensalada de pasta", half: 1.90 , entire: 3.60 , combo: false, garrison_type: 2, with_fish: false },
  { id: 20, plate: "Ensalada de pollo", half: 1.90 , entire: 3.60 , combo: false, garrison_type: 2, with_fish: false },
  { id: 21, plate: "Ensaladilla rusa", half: 1.90 , entire: 3.60 , combo: false, garrison_type: 2, with_fish: false },
  { id: 22, plate: "Ensalada normal (lechuga y tomate)", half: null , entire: null , combo: false, garrison_type: 2, with_fish: false },
  { id: 23, plate: "Pipirrana", half: 2.00 , entire: null, combo: false, garrison_type: 2, with_fish: false },
  { id: 24, plate: "Cuscus", half: null, entire: 3.60, combo: false, garrison_type: 2, with_fish: false },
  { id: 25, plate: "Arroz", half: null, entire: 3.60, combo: false, garrison_type: 1, with_fish: false },
  { id: 26, plate: "Arroz a la cubana", half: null, entire: 3.60, combo: false, garrison_type: 0, with_fish: false },
  { id: 27, plate: "Pisto con huevos fritos", half: null, entire: 3.60, combo: false, garrison_type: 0, with_fish: false },
  { id: 28, plate: "Sin guarnición", half: null, entire: null, combo: false, garrison_type: 2, with_fish: false }
  ];

  sandwiches = [{ id: 1, sandwich: "Carne en salsa", price: 2.75 },
    { id: 2, sandwich: "LQTA (Lomo, queso, tomate, alioli)", price: 2.75 },
    { id: 3, sandwich: "LQTM (Lomo, queso, tomate, mahonesa)", price: 2.75 },
    { id: 4, sandwich: "PQTA (Pollo, queso, tomate, alioli)", price: 2.75 },
    { id: 5, sandwich: "PQTM (Pollo, queso, tomate, mahonesa)", price: 2.75 },
    { id: 6, sandwich: "Tortilla, queso, tomate", price: 2.75 },
    { id: 7, sandwich: "Alexandre (Tortilla de queso, pimiento, tomate, alioli)", price: 2.75 },
    { id: 8, sandwich: "Jamón, queso, tomate", price: 2.75 },
    { id: 9, sandwich: "Bacon, queso", price: 2.75 },
    { id: 10, sandwich: "Atún, queso, tomate", price: 2.75 },
    { id: 11, sandwich: "Tortilla", price: 2.45 },
    { id: 12, sandwich: "Lomo", price: 2.45 },
    { id: 13, sandwich: "Queso", price: 2.45 },
    { id: 14, sandwich: "Jamón", price: 2.45 },
    { id: 15, sandwich: "Atún", price: 2.45 },
    { id: 16, sandwich: "Beicon", price: 2.45 },
    { id: 17, sandwich: "Salchichón", price: 2.25 },
    { id: 18, sandwich: "Chorizo", price: 2.25 }
  ];

  desserts = [{ id: 1, dessert: "Arroz con leche", price: 0.8 },
    { id: 2, dessert: "Flan", price: 0.8 },
    { id: 3, dessert: "Tarta de limón", price: 1 },
    { id: 4, dessert: "Ensalada de frutas", price: 1 },
  ];

  constructor() { }

  getPlates(filter){
    var me = this,
        filtered;
    switch(filter){
      case "1":
        filtered = me.plates.filter(me.comboFilter);
        break;
      case "2":
        filtered = me.plates.filter(me.halfFilter);
        break;
      case "3":
        filtered = me.plates.filter(me.entireFilter);
        break;
    }
    return filtered.sort(me.sortByPlate);
  }

  getGarrison(garrison_type){
    var me = this;
    return me.plates.filter(function(garrison){
      return garrison.combo === false && garrison.garrison_type >= garrison_type;
    });
  }

  private comboFilter(plate){
    return plate.combo;
  }

  private halfFilter(plate){
    return plate.half !== null;
  }

  private entireFilter(plate){
    return plate.entire !== null;
  }

  private sortByPlate(a, b){
    var x = a.plate.toLowerCase();
    var y = b.plate.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  };

}

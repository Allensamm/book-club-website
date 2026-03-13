// Run: node scripts/06_generate_bots.js > scripts/06_seed_spotlight_bots.sql
// Then paste the output into Supabase SQL Editor

const names = [
  "Amara Osei","Kenji Tanaka","Sofia Reyes","Liam O'Brien","Fatima Al-Hassan","Chen Wei","Priya Sharma",
  "Marcus Johnson","Yuki Nakamura","Isabella Rossi","Oluwaseun Adeyemi","Björn Lindqvist","Anya Petrova",
  "Diego Morales","Mei-Lin Chang","Hassan El-Amin","Chloe Dubois","Ravi Patel","Nkechi Okonkwo","Tomáš Novák",
  "Aisha Mohammed","Erik Johansson","Valentina Cruz","Jin-Ho Park","Zara Khan","Mikhail Volkov","Luna García",
  "Akira Sato","Nadia Benali","Oscar Lindberg","Thandiwe Ndlovu","Elara Papadopoulos","Santiago Ruiz",
  "Hana Kim","Dmitri Kozlov","Leila Rashidi","Felix Weber","Aminata Diallo","Raj Kapoor","Ingrid Andersen",
  "Chidinma Eze","Pablo Herrera","Yuna Watanabe","Kwame Asante","Maren Schulz","Tariq Mansouri","Rosa Fernandez",
  "Nikolai Petrov","Adaeze Obi","Henrik Larsen","Sakura Morita","Omar Farooq","Lucia Moretti","Ezra Campbell",
  "Farah Abdi","Sven Nilsson","Inara Begum","Carlos Delgado","Emiko Ito","Jabari Williams","Katarina Müller",
  "Rashid Ahmed","Paloma Vega","Taro Hayashi","Nneka Chukwu","Mateo Silva","Ayumi Fujita","Kofi Mensah",
  "Astrid Berg","Devi Sundaram","Rafael Torres","Hye-Jin Lee","Adebayo Ogundimu","Freya Pedersen","Ananya Gupta",
  "Leo Martinez","Satoshi Yamamoto","Zainab Yusuf","Gustav Eriksson","Camila Rojas","Haruto Suzuki","Folake Balogun",
  "Pierre Lefèvre","Meera Nair","Soren Jensen","Amira Salem","Takeshi Ono","Blessing Okafor","André Costa",
  "Mai Nguyen","Ibrahim Diop","Elena Ivanova","Javier Romero","Suki Pham","Obinna Achebe","Sigrid Holm",
  "Arjun Reddy","Noemi Bianchi","Hiroshi Kimura","Chiamaka Okoro","Magnus Dahl","Layla Hussain","Tenzin Dorji",
  "Petra Kovacs","Rohan Malhotra","Isabelle Laurent","Sekou Toure","Vera Sokolova","Dante Esposito","Habiba Oumar",
  "Nils Svensson","Sumire Aoki","Chidi Nwosu","Brigitte Schneider","Kaito Mori","Adama Traoré","Elsa Lindgren",
  "Vivaan Singh","Claudia Vargas","Ren Takahashi","Abena Boateng","Lukas Fischer","Sarina Basnet","Emeka Obi",
  "Astrid Olsson","Min-Jun Kim","Dalila Bensalem","Tobias Krause","Yuto Ishida","Ngozi Enwonwu","Carmen Navarro",
  "Kenta Ueda","Oumou Sangaré","Lars Magnusson","Kavita Joshi","Philippe Moreau","Aiko Tanabe","Tendai Moyo",
  "Ana Pereira","Ryuji Saito","Fatou Sow","Stefan Berger","Lina Chakraborty","Hugo Almeida","Misaki Endo",
  "Kwesi Appiah","Margaux Petit","Vikram Desai","Chioma Igwe","Florian Huber","Nozomi Ogawa","Seydou Keita",
  "Elisa Colombo","Arun Kumar","Monique Baptiste","Toshio Nishimura","Ife Adewale","Oskar Hauge","Sunita Thapa",
  "Manuel Ortiz","Kaori Shimizu","Abdoul Diallo","Greta Hoffman","Deepak Bhandari","Celine Dupont","Kazuki Honda",
  "Adama Keita","Ines Martins","Sho Yamada","Nana Owusu","Viktor Ström","Padma Krishnan","Ricardo Lima",
  "Ayaka Miura","Boubacar Diagne","Helga Braun","Nikhil Verma","Sophie Girard","Tatsuya Kato","Esther Amoah",
  "Franz Bauer","Megumi Sasaki","Mamadou Camara","Alma Kovačević","Suresh Menon","Claire Fontaine","Koji Okamoto",
  "Wanjiku Mwangi","Otto Richter","Nisha Agarwal","Julio Castillo","Aya Kobayashi","Diallo Sidibé","Iris Vogel",
  "Sunil Jha","Gabrielle Martin","Daisuke Maeda","Adeola Fashola","Karl Zimmerman","Pooja Iyer","Eduardo Reyes",
  "Hinata Sakata","Aliou Cissé","Marta Szabo","Vinay Hegde","Colette Bernard","Souta Matsuda","Ama Aidoo",
  "Heinrich Wolf","Shreya Das","Alejandro Fuentes","Nanami Kuroda","Moussa Konaté","Eva Becker","Ashok Rajan",
  "Juliette Morel","Riku Fukuda","Efua Mensah","Werner Lang","Gayathri Srinivasan","Sebastián Vargas","Miku Hirano",
  "Ibrahima Ba","Charlotte Bonnet","Mohan Tiwari","Miriam Odhiambo","Helmut Keller","Divya Nambiar","Raúl Mendez",
  "Kokoro Nagai","Ousmane Mbaye","Heidi Maier","Ajay Saxena","Adèle Dupuis","Daiki Noguchi","Yaa Asantewaa",
  "Bruno Costa","Sakshi Pandey","Ramón Aguilar","Haru Ueno","Alpha Condé","Sylvie Leroy","Kiran Rao",
  "Manon Duval","Shun Inoue","Fatimata Touré","Ernst Hoffmann","Vanita Shah","Matías Guzmán","Sora Miyamoto",
  "Boubacar Ba","Lotte Schmidt","Pranav Mishra","Odette Blanc","Yuki Harada","Abigail Mensah","Friedrich Neumann",
  "Lalita Deshpande","Tomás Rivera","Haruka Abe","Cheikh Ndiaye","Renate Fischer","Govind Sharma","Cécile Roux",
  "Ken Watanabe","Akosua Darko","Wilhelm Kraus","Sarita Chandra","Felipe Soto","Asuka Yamazaki","Lamine Soumaré",
  "Gisela Werner","Vivek Kulkarni","Madeleine Arnaud","Ryota Kawai","Gifty Annan","Klaus Hartmann","Meena Kumari",
  "Gustavo Campos","Miyu Hashimoto","Modou Faye","Ursula Schwarz","Anil Kapoor","Simone Giraud","Naoki Tsukada",
  "Comfort Agyei","Moritz Wagner","Tara Chopra","Ignacio Vega","Honoka Mochizuki","Babacar Gueye","Petra Wirth",
  "Sanjay Pillai","Lucienne Fabre","Yuuto Morimoto","Adjoa Baah","Rainer Scholz","Aarti Bose","Álvaro Ramos",
  "Kaho Furukawa","Demba Coly","Margit Vogel","Vishnu Menon","Véronique Gauthier","Eiji Noda","Serwa Tetteh",
  "Dieter Engel","Latha Narayanan","Fernando Blanco","Mao Otani","Samba Dieng","Elfriede Gruber","Manoj Shetty",
  "Solange Perrier","Takumi Hirata","Akua Kwarteng","Manfred Schuster","Bhavana Hegde","Lorenzo Conte","Aoi Imai",
  "Alassane Wade","Hannelore Braun","Girish Kale","Mathilde Roche","Kaito Sugiyama","Esi Bonsu","Gerhard Winter",
  "Usha Rani","Andrés Palacios","Koharu Shimada","Amadou Bâ","Ilse Kuhn","Naresh Patil","Brigitte Vidal",
  "Hayato Kaneko","Abena Konadu","Siegfried Mayer","Smita Joshi","Ernesto Luna","Wakaba Saitō","Abdoulaye Sylla",
  "Heike Lenz","Ramesh Bhatt","Josiane Mercier","Sōsuke Ōta","Akosua Frimpong","Rolf Stein","Kamala Nath",
  "Xavier Molina","Chihiro Kawaguchi","Mamady Diabaté","Waltraud Horn","Dilip Ghosh","Thérèse Lambert","Masato Kondo",
  "Yawa Danso","Lothar Frank","Indira Sinha","Roberto Fiore","Fumiko Adachi","Tidiane Ly","Gudrun Seidel",
  "Bimal Sen","Nathalie Roger","Itsuki Tani","Maame Serwah","Albrecht Koch","Nalini Devi","Patricio Ríos",
  "Azusa Shiraishi","Oumar Sanou","Beate Jansen","Hari Lal","Francine Picard","Yūma Hara","Aba Owusu-Agyemang"
];

const personalityTypes = ['critic','enthusiast','casual','academic','emotional','contrarian','supportive'];
const commStyles = ['verbose','concise','poetic','blunt','questioning'];
const genres = ['literary fiction','mystery','thriller','romance','sci-fi','fantasy','horror','historical fiction',
  'memoir','biography','self-help','poetry','philosophy','young adult','graphic novels','true crime','humor','classics','contemporary'];
const quirks = [
  'always mentions their cat','compares everything to Dostoevsky','uses too many exclamation marks',
  'starts messages with Actually...','quotes song lyrics','references cooking metaphors','tells dad jokes',
  'uses British spellings','drops random Spanish words','mentions the weather','references their book club',
  'uses vintage slang','always asks follow-up questions','makes pop culture references','shares personal anecdotes',
  'overthinks metaphors','cites page numbers','prefers audiobooks','reads in the bathtub','has strong opinions on fonts',
  'always brings up the author\'s biography','compares books to movies','uses running metaphors',
  'references their therapist','drinks tea while reading','annotates everything','re-reads favorite passages aloud',
  'keeps a reading journal','rates books on a 10-point scale','prefers hardcovers'
];
const backstories = [
  'Former English teacher who reads 50 books a year',
  'Retired librarian with encyclopedic literary knowledge',
  'College student majoring in comparative literature',
  'Stay-at-home parent who reads during naptime',
  'Software engineer who devours books on the train',
  'Bookstore owner in a small coastal town',
  'Aspiring novelist working on their debut',
  'High school senior in AP English',
  'Podcast host covering new releases',
  'Night shift nurse who reads to decompress',
  'History professor with a love for fiction',
  'Book blogger with 20K followers',
  'Recently retired accountant discovering new genres',
  'Travel writer who reads local literature everywhere',
  'Poetry slam performer branching into prose',
  'Chef who reads cookbooks and novels equally',
  'Musician who finds rhythm in good prose',
  'Grandmother of six, lifelong reader',
  'Film student interested in adaptations',
  'Marine biologist who reads on research boats'
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, min, max) {
  const n = min + Math.floor(Math.random() * (max - min + 1));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
function escSql(s) { return s.replace(/'/g, "''"); }

let sql = '-- Auto-generated: 500 bot personas for Spotlight\n';
sql += '-- Paste this into Supabase SQL Editor after running 05_create_spotlight_tables.sql\n\n';
sql += 'INSERT INTO spotlight_bots (name, avatar_seed, personality_type, reading_preferences, communication_style, backstory, quirks) VALUES\n';

const rows = [];
for (let i = 0; i < 500; i++) {
  const name = names[i % names.length] + (i >= names.length ? ` ${String.fromCharCode(65 + Math.floor(i / names.length))}` : '');
  const seed = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const pt = personalityTypes[i % personalityTypes.length];
  const cs = commStyles[i % commStyles.length];
  const prefs = pickN(genres, 2, 4);
  const bs = pick(backstories);
  const qs = pickN(quirks, 1, 3);

  rows.push(`('${escSql(name)}', '${escSql(seed)}', '${pt}', ARRAY[${prefs.map(p => `'${escSql(p)}'`).join(',')}], '${cs}', '${escSql(bs)}', ARRAY[${qs.map(q => `'${escSql(q)}'`).join(',')}])`);
}

sql += rows.join(',\n') + ';\n';

process.stdout.write(sql);

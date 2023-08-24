import { admin } from "./admin.model.js";
import { users } from "./users.model.js";
import { departments } from "./departments.model.js";
import { centers } from "./centers.model.js";
import { directions } from "./directions.model.js";
import { groups } from "./groups.model.js";
import { positions } from "./positions.model.js";
import { incomes } from "./incomes.model.js";
import { checks } from "./checks.model.js";
import { outlays, sequelize } from "./outlays.model.js";
centers.hasMany(departments, {
  foreignKey: 'center_ref_id'
});
departments.hasMany(positions, {
  foreignKey: 'dep_ref_id'
});
departments.hasMany(directions, {
  foreignKey: 'dep_ref_id',
})
// positions.belongsTo(departments)
// directions.belongsTo(departments)
directions.hasMany(groups, {
  foreignKey: 'dir_ref_id'
});
positions.hasMany(users, {
  foreignKey: 'pos_ref_id'
});
groups.hasMany(checks, {
  foreignKey: 'gr_ref_id'
});
groups.hasMany(users, {
  foreignKey: 'group_ref_id'
});
users.hasMany(checks, {
  foreignKey: 'user_ref_id'
});
users.hasMany(incomes, {
  foreignKey: 'user_ref_id'
});


sequelize.sync({alter: true});


export {departments, positions, directions, groups, users, checks, incomes, admin, outlays};
//  admin.create({gmail: "leonel.messi@gmail.com", contact: "998919001020"})
// groups.create({gr_number: 98, salary: 800000, dir_ref_id:9 })
// groups.create({gr_number: 13, salary: 700000, dir_ref_id:10 })

// directions.bulkCreate([{dir_name: 'Node js', duration: '3 month', salary: 800000, dep_ref_id: 3}])
// directions.bulkCreate([{dir_name:' Next js', duration: '5 month', salary: 300000, dep_ref_id: 3}])
// directions.bulkCreate([{dir_name: 'SMM', duration: '2 month', salary: 500000, dep_ref_id: 4}])
// directions.bulkCreate([{dir_name: 'Bugalteriya', duration: '7 month', salary: 1000000, dep_ref_id: 5}])


//  positions.create({pos_name: 'Student', salary: 800000, dep_ref_id: 3})
//  positions.create({pos_name: 'Teacher', salary: 5000000, dep_ref_id: 3})
//  positions.create({pos_name: 'Bugalter', salary: 6000000, dep_ref_id: 5})
//  positions.create({pos_name: 'Instagreamer', salary: 2000000, dep_ref_id: 4})

//  users.bulkCreate([{
//   "first_name": "Samaria",
//   "last_name": "Lightowler",
//   "email": "slightowler0@merriam-webster.com",
//   "gender": 2,
//   "contact": "+1 547 241 5867",
//   "pos_ref_id": 5,
//   "group_ref_id": 4
// }, {
//   "first_name": "Mercedes",
//   "last_name": "Torn",
//   "email": "mtorn1@merriam-webster.com",
//   "gender": 2,
//   "contact": "+62 782 795 7712",
//   "pos_ref_id": 8,
//   "group_ref_id": null
// }, {
//   "first_name": "Glynnis",
//   "last_name": "Axby",
//   "email": "gaxby2@hugedomains.com",
//   "gender": 2,
//   "contact": "+55 794 626 1919",
//   "pos_ref_id": 5,
//   "group_ref_id": 4
// }, {
//   "first_name": "Olympe",
//   "last_name": "Jowsey",
//   "email": "ojowsey3@google.co.uk",
//   "gender": 1,
//   "contact": "+34 990 604 1964",
//   "pos_ref_id": 6,
//   "group_ref_id": 3
// }, {
//   "first_name": "Teriann",
//   "last_name": "Wann",
//   "email": "twann4@intel.com",
//   "gender": 2,
//   "contact": "+62 947 991 9539",
//   "pos_ref_id": 7,
//   "group_ref_id": null
// }, {
//   "first_name": "Wit",
//   "last_name": "Bawme",
//   "email": "wbawme5@trellian.com",
//   "gender": 1,
//   "contact": "+63 388 761 2521",
//   "pos_ref_id": 8,
//   "group_ref_id": null
// }, {
//   "first_name": "Dilly",
//   "last_name": "Strauss",
//   "email": "dstrauss6@loc.gov",
//   "gender": 1,
//   "contact": "+7 612 571 9329",
//   "pos_ref_id": 5,
//   "group_ref_id": 3
// }, {
//   "first_name": "Caitlin",
//   "last_name": "Pillington",
//   "email": "cpillington7@edublogs.org",
//   "gender": 1,
//   "contact": "+60 753 962 9039",
//   "pos_ref_id": 6,
//   "group_ref_id": 4
// }])
// departments.create({dep_name: 'Oquv bolimi', center_ref_id: 1})
// departments.create({dep_name: 'Marketing', center_ref_id: 1})
// departments.create({dep_name: 'Transaction bolimi', center_ref_id: 1})

// centers.create({name: "Najot", address: "Chimboy"})

 


 











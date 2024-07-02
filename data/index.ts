export interface State {
    id: number;
    label: string;
  }
  
  export interface District {
    id: number;
    label: string;
  }
  export interface shopCategories {
    id: number;
    label: string;
  }
  
  const data = {
    genders : [
      {id: 1, label: 'Male'},
      {id: 2, label: 'Female'},
      {id: 3, label: 'Others'},
    ],
    states: [
      { id: 1, label: 'Andhra Pradesh' },
      { id: 2, label: 'Arunachal Pradesh' },
      { id: 3, label: 'Assam' },
      { id: 4, label: 'Bihar' },
      { id: 5, label: 'Chhattisgarh' },
      { id: 6, label: 'Goa' },
      { id: 7, label: 'Gujarat' },
      { id: 8, label: 'Haryana' },
      { id: 9, label: 'Himachal Pradesh' },
      { id: 10, label: 'Jharkhand' },
      { id: 11, label: 'Karnataka' },
      { id: 12, label: 'Kerala' },
      { id: 13, label: 'Madhya Pradesh' },
      { id: 14, label: 'Maharashtra' },
      { id: 15, label: 'Manipur' },
      { id: 16, label: 'Meghalaya' },
      { id: 17, label: 'Mizoram' },
      { id: 18, label: 'Nagaland' },
      { id: 19, label: 'Odisha' },
      { id: 20, label: 'Punjab' },
      { id: 21, label: 'Rajasthan' },
      { id: 22, label: 'Sikkim' },
      { id: 23, label: 'Tamil Nadu' },
      { id: 24, label: 'Telangana' },
      { id: 25, label: 'Tripura' },
      { id: 26, label: 'Uttar Pradesh' },
      { id: 27, label: 'Uttarakhand' },
      { id: 28, label: 'West Bengal' }
    ],
    districts: {
      1: [{ id: 1, label: 'Anantapur' }, { id: 2, label: 'Chittoor' }, { id: 3, label: 'East Godavari' }, { id: 4, label: 'Guntur' }],
      2: [{ id: 5, label: 'Tawang' }, { id: 6, label: 'West Kameng' }, { id: 7, label: 'East Kameng' }],
      3: [{ id: 8, label: 'Baksa' }, { id: 9, label: 'Barpeta' }, { id: 10, label: 'Biswanath' }],
      4: [{ id: 11, label: 'Araria' }, { id: 12, label: 'Arwal' }, { id: 13, label: 'Aurangabad' }],
      5: [{ id: 14, label: 'Balod' }, { id: 15, label: 'Baloda Bazar' }, { id: 16, label: 'Balrampur' }],
      6: [{ id: 17, label: 'North Goa' }, { id: 18, label: 'South Goa' }],
      7: [{ id: 19, label: 'Ahmedabad' }, { id: 20, label: 'Amreli' }, { id: 21, label: 'Anand' }],
      8: [{ id: 22, label: 'Ambala' }, { id: 23, label: 'Bhiwani' }, { id: 24, label: 'Charkhi Dadri' }],
      9: [{ id: 25, label: 'Bilaspur' }, { id: 26, label: 'Chamba' }, { id: 27, label: 'Hamirpur' }],
      10: [{ id: 28, label: 'Bokaro' }, { id: 29, label: 'Chatra' }, { id: 30, label: 'Deoghar' }],
      11: [{ id: 31, label: 'Bagalkot' }, { id: 32, label: 'Ballari' }, { id: 33, label: 'Belagavi' }],
      12: [{ id: 34, label: 'Alappuzha' }, { id: 35, label: 'Ernakulam' }, { id: 36, label: 'Idukki' }],
      13: [{ id: 37, label: 'Agar Malwa' }, { id: 38, label: 'Alirajpur' }, { id: 39, label: 'Anuppur' }],
      14: [{ id: 40, label: 'Ahmednagar' }, { id: 41, label: 'Akola' }, { id: 42, label: 'Amravati' }],
      15: [{ id: 43, label: 'Bishnupur' }, { id: 44, label: 'Chandel' }, { id: 45, label: 'Churachandpur' }],
      16: [{ id: 46, label: 'East Garo Hills' }, { id: 47, label: 'East Jaintia Hills' }, { id: 48, label: 'East Khasi Hills' }],
      17: [{ id: 49, label: 'Aizawl' }, { id: 50, label: 'Champhai' }, { id: 51, label: 'Kolasib' }],
      18: [{ id: 52, label: 'Dimapur' }, { id: 53, label: 'Kiphire' }, { id: 54, label: 'Kohima' }],
      19: [{ id: 55, label: 'Angul' }, { id: 56, label: 'Balangir' }, { id: 57, label: 'Balasore' }],
      20: [{ id: 58, label: 'Amritsar' }, { id: 59, label: 'Barnala' }, { id: 60, label: 'Bathinda' }],
      21: [{ id: 61, label: 'Ajmer' }, { id: 62, label: 'Alwar' }, { id: 63, label: 'Banswara' }],
      22: [{ id: 64, label: 'East Sikkim' }, { id: 65, label: 'North Sikkim' }, { id: 66, label: 'South Sikkim' }],
      23: [{ id: 67, label: 'Ariyalur' }, { id: 68, label: 'Chennai' }, { id: 69, label: 'Coimbatore' }],
      24: [{ id: 70, label: 'Adilabad' }, { id: 71, label: 'Bhadradri Kothagudem' }, { id: 72, label: 'Hyderabad' }],
      25: [{ id: 73, label: 'Dhalai' }, { id: 74, label: 'Gomati' }, { id: 75, label: 'Khowai' }],
      26: [{ id: 76, label: 'Agra' }, { id: 77, label: 'Aligarh' }, { id: 78, label: 'Prayagraj' }],
      27: [{ id: 79, label: 'Almora' }, { id: 80, label: 'Bageshwar' }, { id: 81, label: 'Chamoli' }],
      28: [{ id: 82, label: 'Alipurduar' }, { id: 83, label: 'Bankura' }, { id: 84, label: 'Birbhum' }]
    },
    shopCategories: [
        { id: 1, label: "Electronics" },
        { id: 2, label: "Clothing" },
        { id: 3, label: "Books" },
        { id: 4, label: "Home & Garden" },
        { id: 5, label: "Toys & Games" },
        { id: 6, label: "Others" }
      ],
      Products: [
        {id: 1, productId: 'VSP101', name: 'Samsung Television 50g hybrid runns on both inverter and electricity', qty: 10, price: 10000, status: 'Active'},
        {id: 2, productId: 'VSP102', name: 'Whirpool Washing machine', qty: 5, price: 7000, status: 'Sold'},
        {id: 3, productId: 'VSP103', name: 'Bajaj Grinder', qty: 8, price: 2000, status: 'Active'},
        {id: 4, productId: 'VSP104', name: 'Sony Sound System', qty: 15, price: 15000, status: 'Active'},
        {id: 5, productId: 'VSP105', name: 'LG Refrigerator', qty: 7, price: 12000, status: 'Sold'},
        {id: 6, productId: 'VSP106', name: 'Philips Mixer', qty: 20, price: 2500, status: 'Active'},
        {id: 7, productId: 'VSP107', name: 'Panasonic Microwave', qty: 10, price: 8000, status: 'Active'},
        {id: 8, productId: 'VSP108', name: 'Dell Laptop', qty: 5, price: 50000, status: 'Active'},
        {id: 9, productId: 'VSP109', name: 'HP Printer', qty: 12, price: 6000, status: 'Sold'},
        {id: 10, productId: 'VSP110', name: 'Canon Camera', qty: 9, price: 25000, status: 'Active'},
        {id: 11, productId: 'VSP111', name: 'JBL Headphones', qty: 30, price: 2000, status: 'Active'},
        {id: 12, productId: 'VSP112', name: 'Apple iPhone 13', qty: 3, price: 70000, status: 'Sold'},
        {id: 13, productId: 'VSP113', name: 'Samsung Galaxy Tab', qty: 6, price: 30000, status: 'Active'},
        {id: 14, productId: 'VSP114', name: 'Nokia Mobile', qty: 20, price: 5000, status: 'Active'},
        {id: 15, productId: 'VSP115', name: 'Lenovo Tablet', qty: 8, price: 15000, status: 'Sold'},
        {id: 16, productId: 'VSP116', name: 'Mi Smart Band', qty: 25, price: 2000, status: 'Active'},
        {id: 17, productId: 'VSP117', name: 'Asus Router', qty: 15, price: 3500, status: 'Active'},
        {id: 18, productId: 'VSP118', name: 'Bose Speaker', qty: 10, price: 10000, status: 'Sold'},
        {id: 19, productId: 'VSP119', name: 'Sony PlayStation 5', qty: 4, price: 50000, status: 'Active'},
        {id: 20, productId: 'VSP120', name: 'Microsoft Surface Pro', qty: 7, price: 60000, status: 'Active'}
      ],
      ActiveProducts: [
        {id: 1, productId: 'VSP101', name: 'Samsung Television 50g hybrid runns on both inverter and electricity', qty: 10, price: 10000, status: 'Active'},
      
        {id: 3, productId: 'VSP103', name: 'Bajaj Grinder', qty: 8, price: 2000, status: 'Active'},
        {id: 4, productId: 'VSP104', name: 'Sony Sound System', qty: 15, price: 15000, status: 'Active'},
       
        {id: 6, productId: 'VSP106', name: 'Philips Mixer', qty: 20, price: 2500, status: 'Active'},
        {id: 7, productId: 'VSP107', name: 'Panasonic Microwave', qty: 10, price: 8000, status: 'Active'},
        {id: 8, productId: 'VSP108', name: 'Dell Laptop', qty: 5, price: 50000, status: 'Active'},
      
        {id: 10, productId: 'VSP110', name: 'Canon Camera', qty: 9, price: 25000, status: 'Active'},
        {id: 11, productId: 'VSP111', name: 'JBL Headphones', qty: 30, price: 2000, status: 'Active'},
      
        {id: 13, productId: 'VSP113', name: 'Samsung Galaxy Tab', qty: 6, price: 30000, status: 'Active'},
        {id: 14, productId: 'VSP114', name: 'Nokia Mobile', qty: 20, price: 5000, status: 'Active'},
      
        {id: 16, productId: 'VSP116', name: 'Mi Smart Band', qty: 25, price: 2000, status: 'Active'},
        {id: 17, productId: 'VSP117', name: 'Asus Router', qty: 15, price: 3500, status: 'Active'},
    
        {id: 19, productId: 'VSP119', name: 'Sony PlayStation 5', qty: 4, price: 50000, status: 'Active'},
        {id: 20, productId: 'VSP120', name: 'Microsoft Surface Pro', qty: 7, price: 60000, status: 'Active'}
      ],
      SoldProducts: [
        {id: 2, productId: 'VSP102', name: 'Whirpool Washing machine', qty: 5, price: 7000, status: 'Sold'},
        {id: 5, productId: 'VSP105', name: 'LG Refrigerator', qty: 7, price: 12000, status: 'Sold'},
        {id: 9, productId: 'VSP109', name: 'HP Printer', qty: 12, price: 6000, status: 'Sold'},
        {id: 12, productId: 'VSP112', name: 'Apple iPhone 13', qty: 3, price: 70000, status: 'Sold'},
        {id: 15, productId: 'VSP115', name: 'Lenovo Tablet', qty: 8, price: 15000, status: 'Sold'},
        {id: 18, productId: 'VSP118', name: 'Bose Speaker', qty: 10, price: 10000, status: 'Sold'},
      ],
      Employees: [
        {id: 1, profileImg: "https://ilaaj-doot.codebucketstage.online/api/illaj-doot-logo/avatar.png", EmployeeId: 'VSE101', name: 'Guru Sharan Kumar Ram', email: 'guruSharankumarram1@gmail.com', mobileNumber: '9685789654', altMobileNo: '', genderId: 1, gender: "Male", dob: "2001-05-03", stateId:4,  state: 'Bihar', distId: 11, dist: 'Araria', cityVillage: 'Najirpur', statusId: 1, status: 'Active', isId: true, idImage: "https://adarshc.com/index/ent/document/default/aadharimg.jpg", idType: 'image'},
        {id: 2, profileImg: "https://ilaaj-doot.codebucketstage.online/api/illaj-doot-logo/avatar.png", EmployeeId: 'VSE102', name: 'Akash Chauhan', email: 'akash.chahun@gmail.com', mobileNumber: '9521457896', altMobileNo: '9657896540', statusId: 2, status: 'Hold', genderId: 1, gender: "Male", dob: "2000-03-25",  stateId:4, state: 'Bihar',distId: 13, dist: 'Aurangabad', cityVillage: 'Jitwarpur',isId: false, idImage: null, idType: null},
        {id: 3, profileImg: "https://ilaaj-doot.codebucketstage.online/api/illaj-doot-logo/avatar.png", EmployeeId: 'VSE103', name: 'Suhana Singh', email: 'suhan3459@gmail.com', mobileNumber: '', altMobileNo: '965789652', genderId: 2, gender: "Female", dob: "2003-08-006",statusId: 1, status: 'Active',  stateId:4, state: 'Bihar', dist: 'Arwal', distId: 12, cityVillage: 'Rampatti',isId: true, idImage: "https://adarshc.com/index/ent/document/default/aadharimg.jpg", idType: 'image'},
        {id: 4, profileImg: "https://ilaaj-doot.codebucketstage.online/api/illaj-doot-logo/avatar.png", EmployeeId: 'VSE104', name: 'Rajat Kumar', email: '', mobileNumber: '9658789654', altMobileNo: '',  gender: "Male", genderId: 1, dob: "1995-02-009",statusId: 3, status: 'Suspended',  stateId:4, state: 'Bihar', dist: 'Arwal', distId: 12, cityVillage: 'Madhubani',isId: true, idImage: "https://adarshc.com/index/ent/document/default/aadharimg.jpg", idType: 'image'},       
      ],
      Ledger: [
        {id: 1, message: 'Bajaj Grinder #VSP103 sold from App',  amount: 4000, user: "Guru Sharan Kumar Ram", Qty: 2, dateTime: "26 June 2024 5:40:00 PM", type: "sold"},
        {id: 2, message: 'Samsung Television 50g hybrid runns on both inverter and electricity #VSP101 sold from App',  amount: 10000, user: "Suhana Singh", Qty: 1, dateTime: "25 June 2024 02:33:00 PM", type: "sold"},
        {id: 3, message: 'Microsoft Surface Pro #VSP120 added to app',  amount: 120000, user: "Suhana Singh", Qty: 2, dateTime: "26 June 2024 11:22:00 AM", type: "add"},
      
      ],
      Notifications: [
       {id: 1, notification: "Product Bajaj Grinder #VSP103 added by Guru Sharan Kumar Ram. Click here to view Details.", dateTime: "26 June 2024 5:40:00 PM",  isRead: false, screen: "ProductHistory"},
       {id: 2, notification: "Product Sony Sound System sold by Guru Sharan Kumar Ram. Click here to view bill.", isRead: false, dateTime: "25 May 2024 6:20:00 PM", screen: "ProductHistory"},
       {id: 3, notification: "Product Philips Mixer #VSP106 delevered to buyer. Amount will credit soon.",  dateTime: "24 May 2024 02:14:00 PM", isRead : true, screen: null},
       {id: 4, notification: "Product Philips Mixer #VSP106 shipped.", isRead : true, dateTime: "20 May 2024 11:06:00 AM", screen: null},
       {id: 5, notification: "New Order Placed for Product Philips Mixer. Click here to view Details.", isRead : true, dateTime: "18 May 2024 08:40:00 PM", screen: null}       
      ],

      status: [
        {id: 1, label: 'Active'},
        {id: 2, label: 'Hold'},
        {id: 3, label: 'Suspended'},
      ],

      Activities: [
        {id: 1, activity: 'Tries to login from another device.', dateTime: '26 Jun 2024 08:12:15 PM'},
        {id: 2, activity: 'Logout from app', dateTime: '25 Jun 2024 06:10:12 PM'},
        {id: 3, activity: '#VSP104 sold from app', dateTime: '25 Jun 2024 01:13:16 PM'},
        {id: 4, activity: '#VSP1020 added to app', dateTime: '25 Jun 2024 10:28:25 AM'},
        {id: 5, activity: 'Logged in to App', dateTime: '25 Jun 2024 09:10:12 AM'},
        {id: 6, activity: 'Tries to login from another device.', dateTime: '20 Jun 2024 08:12:15 PM'},
        {id: 7, activity: 'Logout from app', dateTime: '19 Jun 2024 06:10:12 PM'},
        {id: 8, activity: '#VSP104 sold from app', dateTime: '19 Jun 2024 01:13:16 PM'},
        {id: 9, activity: '#VSP1020 added to app', dateTime: '19 Jun 2024 10:28:25 AM'},
        {id: 10, activity: 'Logged in to App', dateTime: '19 Jun 2024 09:10:12 AM'},
      
      ]
      
       
  };
  
  export default data;
  
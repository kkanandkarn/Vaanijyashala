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
        { "id": 1, "label": "Electronics" },
        { "id": 2, "label": "Clothing" },
        { "id": 3, "label": "Books" },
        { "id": 4, "label": "Home & Garden" },
        { "id": 5, "label": "Toys & Games" },
        { "id": 6, "label": "Others" }
      ],

       
  };
  
  export default data;
  
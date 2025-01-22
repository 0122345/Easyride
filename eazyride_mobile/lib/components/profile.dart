// import 'package:flutter/material.dart';
// import 'package:country_picker/country_picker.dart';
// import 'package:country_flags/country_flags.dart';

// class ProfilePage extends StatefulWidget {
//   const ProfilePage({super.key});

//   @override
//   State<ProfilePage> createState() => _ProfilePageState();
// }

// class _ProfilePageState extends State<ProfilePage> {
//   final TextEditingController _nameController = TextEditingController();
//   final TextEditingController _emailController = TextEditingController();
//   final TextEditingController _phoneController = TextEditingController();
//   final TextEditingController _genderController = TextEditingController();

//   @override
//   void dispose() {
//     _nameController.dispose();
//     _emailController.dispose();
//     _phoneController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Column(
//         children: [
//           _buildHeader(),
//           SizedBox(
//             height: 20.0,
//           ),
//           _buildAvatar(),
//           SizedBox(
//             height: 20.0,
//           ),
//           _buildNameField(),
//         ],
//       ),
//     );
//   }


//   Widget _buildPhoneField() {
//     return Row(
//       children: [
//         GestureDetector(
//           onTap: _showCountryPicker,
//           child: Container(
//             height: 50,
//             padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
//             decoration: BoxDecoration(
//               border: Border.all(color: Colors.grey),
//               borderRadius: BorderRadius.circular(10),
//             ),
//             child: Row(
//               children: [
//                 if (selectedCountry != null)
//                   CountryFlag.fromCountryCode(
//                     selectedCountry!.countryCode.toLowerCase(),
//                     height: 24,
//                     width: 32,
//                   ),
//                 if (selectedCountry != null) const SizedBox(width: 8),
//                 Text('+${selectedCountry?.phoneCode ?? "Select"}'),
//                 const Icon(Icons.arrow_drop_down),
//               ],
//             ),
//           ),
//         ),
//         const SizedBox(width: 8),
//         Expanded(
//           child: TextFormField(
//             controller: _phoneController,
//             keyboardType: TextInputType.phone,
//             decoration: InputDecoration(
//               labelText: 'Phone Number',
//               border:
//                   OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
//             ),
//             validator: (value) {
//               if (value == null || value.trim().isEmpty) {
//                 return 'Phone number is required';
//               }
//               if (value.trim().length < 9) {
//                 return 'Enter a valid phone number';
//               }
//               return null;
//             },
//           ),
//         ),
//       ],
//     );
//   }

  
//   void _showCountryPicker() {
//     showCountryPicker(
//       context: context,
//       showPhoneCode: true,
//       onSelect: (Country country) {
//         setState(() => selectedCountry = country);
//       },
//     );
//   }
// }

// Widget _buildHeader() {
//   return Row(
//     children: [
//       Row(
//         children: [
//           IconButton(
//             onPressed: () {},
//             icon: Icon(Icons.arrow_back_ios_new_rounded),
//           ),
//           Text(
//             'Back',
//             style: TextStyle(),
//           ),
//         ],
//       ),
//       Center(
//         child: Text(
//           'Profile',
//           style: TextStyle(),
//         ),
//       ),
//     ],
//   );
// }

// Widget _buildAvatar() {
//   return CircleAvatar(
//     backgroundColor: Colors.grey,
//     radius: 23.0,
//     child: Icon(Icons.person_2_rounded),
//   );
// }

// Widget _buildNameField() {
//   return TextFormField(
//     controller: _nameController,
//     decoration: InputDecoration(
//       labelText: 'FullName',
//       border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
//     ),
//     validator: (value) {
//       if (value == null || value.trim().isEmpty) {
//         return 'Name is required';
//       }
//       if (value.trim().length < 2) {
//         return 'Name must be at least 2 characters';
//       }
//       return null;
//     },
//   );
// }


import 'package:eazyride_mobile/theme/hex_color.dart';
import 'package:flutter/material.dart';

class WelcmScreen extends StatelessWidget {
  const WelcmScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
            //  mainAxisAlignment: MainAxisAlignment.end,
            mainAxisAlignment: MainAxisAlignment.center,
              
              children: [
                //TODO:animation
                Column(
                 // spacing: 10, byanze
                  children: [
                    Text(
                      'Welcome',
                      style: TextStyle(
                        fontSize: 25,
                      ),
                    ),
                     SizedBox(height:10),
                    Text(
                      'Have a better sharing experience',
                      style: TextStyle(
                        fontSize: 12,
                        
                      ),
                    ),
                     SizedBox(height:50),
                     GestureDetector(
                      // TODO: directing to enabling location
                       child: Container(
                          width: 250,
                          height: 50,
                          decoration: BoxDecoration(
                           color: HexColor("#EDAE10"),
                           borderRadius: BorderRadius.circular(12),
                          ),
                            child: Center(
                              child: Text('Create an account',
                              style: TextStyle(
                                color: Colors.white,
                              ),
                              ),
                            ),
                        ),
                     ),
                      SizedBox(height:10),
                       GestureDetector(
                      // TODO: directing to enabling location
                       child: Container(
                          width: 250,
                          height: 50,
                          decoration: BoxDecoration(
                           color: HexColor("#FFFFFF"),
                           borderRadius: BorderRadius.circular(12),
                           border: Border.all(
                            color: HexColor("#EDAE10"),
                            style: BorderStyle.solid,
                            strokeAlign: 1.0,
                           ),
                          ),
                            child: Center(
                              child: Text('Log in',
                              style: TextStyle(
                                color: HexColor("#EDAE10"),
                              ),
                              ),
                            ),
                        ),
                     ),
                      SizedBox(height:10),
                  ],
                ),
              ],
            ),
      ),
    );
  }
}
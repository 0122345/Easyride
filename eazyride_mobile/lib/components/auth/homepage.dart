import 'package:eazyride_mobile/components/auth/welcm.dart';
import 'package:flutter/material.dart';

class Homepage extends StatelessWidget {
  const Homepage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),

      //TODO: stacked widget map behind and dialoq box appear
      body: Dialog(
        backgroundColor: Colors.white,
        shadowColor: Colors.green.shade900,
        child: SizedBox(
          width: 300,
          height: 400,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            
            children: [
              //TODO:animation
              Column(
               // spacing: 10, byanze
                children: [
                  SizedBox(height:10),
                  Text(
                    'Enable Your location',
                    style: TextStyle(
                      fontSize: 20,
                    ),
                  ),
                   SizedBox(height:10),
                  Text(
                    'Choose your location to start find the request around you',
                    style: TextStyle(
                      fontSize: 12,
                      
                    ),
                  ),
                   SizedBox(height:10),
                   GestureDetector(
                    // TODO: directing to enabling location
                     child: Container(
                        width: 250,
                        height: 50,
                        decoration: BoxDecoration(
                         color: Colors.yellow,
                         borderRadius: BorderRadius.circular(12),
                        ),
                          child: Center(
                            child: Text('use my location',
                            style: TextStyle(
                              color: Colors.white,
                            ),
                            ),
                          ),
                      ),
                   ),
                    SizedBox(height:10),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context, MaterialPageRoute(builder: (context) => WelcmScreen()));
                      },
                      child: Text('Skip for now',
                      style: TextStyle(
                        fontSize: 12,
                      ),
                                         ),
                    ),
                    SizedBox(height:40),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

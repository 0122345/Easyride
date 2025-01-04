import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //backgroundColor: HexColor("#FFFFFF"),
      backgroundColor: Colors.blue,
      body: Column(
        children: [
          Row(
            children: [
              IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: Icon(Icons.arrow_back_ios_rounded),),
                   SizedBox(width: 3.0,),
                  Text("Back", style: TextStyle(
                    fontSize: 16,
                  ),),
            ],
          ),
        ],
      ),
    );
  }
}
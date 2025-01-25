import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';


class HomeMap extends StatefulWidget {
  const HomeMap({super.key});

  @override
  State<HomeMap> createState() => _HomeMapState();
}

class _HomeMapState extends State<HomeMap> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:   Stack(
  children: [
    FlutterMap(
      options: MapOptions(
        // initialCenter: LatLng(30.0444, -1.9441),
        //  maxZoom: 14,
      ),
      children: [
        TileLayer(
          urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        ),
        MarkerLayer(
          markers: [
            Marker(
              point: LatLng(30.0444, -1.9441),
              width: 80.0,
              height: 80.0,
             child: Icon(
                Icons.location_pin,
                color: Colors.amber,
                size: 40.0,
              ),
            ),
          ],
        ),
      ],
    ),
    IgnorePointer(
      ignoring: false,
      child: _buildTopBar(context),
    ),
    IgnorePointer(
      ignoring: false,
      child: _buildBottomBar(context),
    ),
  ],
),

    );
  }
}


 Widget _buildTopBar(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding:EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: 32.0,
              height: 32.0,
              decoration: BoxDecoration(
                color: Colors.amber,
                borderRadius: BorderRadius.circular(10.0),
              ),
              child: Icon(Icons.menu, color: Colors.black)
              ),
            Row(
              children: [
                Container(
                  width: 32.0,
              height: 32.0,
              decoration: BoxDecoration(
                color: Colors.amber,
                borderRadius: BorderRadius.circular(10.0),
              ),
                  child: Icon(Icons.search, color: Colors.black),),
                SizedBox(width: 16),
                Container(
                  width: 32.0,
              height: 32.0,
              decoration: BoxDecoration(
                color: Colors.amber,
                borderRadius: BorderRadius.circular(10.0),
              ),
                  child: Icon(Icons.notifications, color: Colors.black),),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBottomBar(BuildContext context) {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Align(
              alignment: Alignment.bottomLeft,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.amber,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                child: Text('Rental', style: TextStyle(color: Colors.white)),
              ),
            ),
            SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: Colors.amber.shade100,
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: TextField(
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search, color: Colors.grey),
                  hintText: 'Where would you go?',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16.0,vertical: 7.0),
                ),
              ),
            ),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.amber,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(8),
                          bottomLeft: Radius.circular(8),
                        ),
                      ),
                    ),
                    child: Text('Transport'),
                  ),
                ),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          topRight: Radius.circular(8),
                          bottomRight: Radius.circular(8),
                        ),
                        side: BorderSide(color: Colors.amber),
                      ),
                    ),
                    child: Text('Delivery', style: TextStyle(color: Colors.amber)),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            _buildNavigationBar(),
          ],
        ),
      ),
    );
  }

  Widget _buildNavigationBar() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _buildNavBarItem(Icons.home, 'Home', true),
        _buildNavBarItem(Icons.favorite, 'Favourite'),
        _buildNavBarItem(Icons.local_offer, 'Offer'),
        _buildNavBarItem(Icons.person, 'Profile'),
      ],
    );
  }

  Widget _buildNavBarItem(IconData icon, String label, [bool isSelected = false]) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, color: isSelected ? Colors.amber : Colors.grey),
        Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.amber : Colors.grey,
            fontSize: 12,
          ),
        ),
      ],
    );
  }

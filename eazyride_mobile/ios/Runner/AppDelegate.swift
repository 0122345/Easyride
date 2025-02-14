import Flutter
import UIKit
import GoogleMaps
import CoreLocation

@main
@objc class AppDelegate: FlutterAppDelegate {
  var locationManager: CLLocationManager?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GMSServices.provideAPIKEY("AIzaSyCeO0TgeVuvM-qdUFuzg0vqrOUizU9AQ7U")
    locationManager = CLLocationManager()
        locationManager?.delegate = self
        locationManager?.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
        locationManager?.requestWhenInUseAuthorization()
        locationManager?.startUpdatingLocation()
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
   func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.first {
            print("Current Location: \(location.coordinate.latitude), \(location.coordinate.longitude)")
        }
    }
}

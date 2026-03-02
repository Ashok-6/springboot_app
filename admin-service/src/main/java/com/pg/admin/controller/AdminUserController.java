//package com.pg.admin.controller;
//
//import com.pg.admin.entity.User;
//import com.pg.admin.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/admin/users")
//@CrossOrigin(origins = "http://localhost:5173")
//@RequiredArgsConstructor
//public class AdminUserController {
//
//    private final UserRepository userRepository;
//
//    // ✅ Create User
//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//
//        user.setPaymentStatus("DUE");  // Default
//
//        return ResponseEntity.ok(userRepository.save(user));
//    }
//
//    // ✅ Get All Users
//    @GetMapping
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    // ✅ Get User by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        return ResponseEntity.ok(user);
//    }
//
//    // ✅ Update Electricity Bill
//    @PatchMapping("/{id}/ebill")
//    public ResponseEntity<User> updateElectricBill(
//            @PathVariable Long id,
//            @RequestParam Double ebill) {
//
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setUserEbill(ebill);
//
//        // 🔥 RESET STATUS TO DUE
//        user.setPaymentStatus("DUE");
//
//        userRepository.save(user);
//
//        return ResponseEntity.ok(user);
//    }
//
//    // ✅ Update Payment Status (Called from Payment MS)
//    @PatchMapping("/{id}/status")
//    public ResponseEntity<User> updatePaymentStatus(
//            @PathVariable Long id,
//            @RequestParam String status) {
//
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setPaymentStatus(status);
//
//        userRepository.save(user);
//
//        return ResponseEntity.ok(user);
//    }
//
//    // ✅ Delete User
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
//
//        userRepository.deleteById(id);
//
//        return ResponseEntity.ok("User deleted successfully");
//    }
//}
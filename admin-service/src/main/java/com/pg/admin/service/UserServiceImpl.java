//package com.pg.admin.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.pg.admin.dto.UserDto;
//import com.pg.admin.entity.User;
//import com.pg.admin.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class UserServiceImpl implements UserService {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    private final ModelMapper modelMapper; // if you use ModelMapper for mapping
//    
//
//    // ✅ Convert User entity → UserDto
//    private UserDto mapToDto(User user) {
//        return UserDto.builder()
//                .userId(user.getUserId())
//                .userName(user.getUserName())
//                .userPassword(user.getUserPassword())   // include password
//                .userRoom(user.getUserRoom())
//                .userAadhar(user.getUserAadhar())
//                .userPlace(user.getUserPlace())
//                .userMobile(user.getUserMobile())
//                .userMonthlyRent(user.getUserMonthlyRent())
//                .userEbill(user.getUserEbill())
//                .build();
//    }
//
//    // ✅ Convert UserDto → User entity
//    private User mapToEntity(UserDto dto) {
//        return User.builder()
//                .userId(dto.getUserId())
//                .userName(dto.getUserName())
//                .userPassword(dto.getUserPassword())   // include password
//                .userRoom(dto.getUserRoom())
//                .userAadhar(dto.getUserAadhar())
//                .userPlace(dto.getUserPlace())
//                .userMobile(dto.getUserMobile())
//                .userMonthlyRent(dto.getUserMonthlyRent())
//                .userEbill(dto.getUserEbill())
//                .build();
//    }
//
//    /**
//     * ✅ Create new User
//     * - Encodes the password before saving.
//     * - Saves User into DB and returns UserDto.
//     */
//    @Override
//    public UserDto createUser(UserDto userDto) {
//        User user = mapToEntity(userDto);
//        user.setUserPassword(passwordEncoder.encode(userDto.getUserPassword())); // encode password
//        return mapToDto(userRepository.save(user));
//    }
//
//    /**
//     * ✅ Fetch a User by ID
//     * @param userId (User ID)
//     * @return UserDto if found, else throws RuntimeException
//     */
//    @Override
//    public UserDto getUserById(Long userId) {
//        return userRepository.findById(userId)
//                .map(this::mapToDto)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//    }
//
//    /**
//     * ✅ Update User details
//     * - Finds user by ID.
//     * - Updates all editable fields except password.
//     * - Saves and returns updated UserDto.
//     */
//    @Override
//    public UserDto updateUser(Long userId, UserDto userDto) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setUserName(userDto.getUserName());
//        user.setUserRoom(userDto.getUserRoom());
//        user.setUserAadhar(userDto.getUserAadhar());
//        user.setUserPlace(userDto.getUserPlace());
//        user.setUserMobile(userDto.getUserMobile());
//        user.setUserMonthlyRent(userDto.getUserMonthlyRent());
//        user.setUserEbill(userDto.getUserEbill());
//
//        return mapToDto(userRepository.save(user));
//    }
//
//    /**
//     * ✅ Delete User by ID
//     * - Removes user record from DB.
//     */
//    @Override
//    public void deleteUser(Long userId) {
//        userRepository.deleteById(userId);
//    }
//
//    /**
//     * ✅ Get all Users
//     * - Fetches all users from DB.
//     * - Maps entities to DTOs.
//     */
//    @Override
//    public List<UserDto> getAllUsers() {
//        return userRepository.findAll()
//                .stream()
//                .map(this::mapToDto)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * ✅ Find user by Mobile number
//     * @param mobile (User's mobile number)
//     * @return UserDto if found, else throws RuntimeException
//     */
//    @Override
//    public UserDto getUserByMobile(String mobile) {
//        return userRepository.findByUserMobile(mobile)
//                .map(this::mapToDto)
//                .orElseThrow(() -> new RuntimeException("User not found with mobile: " + mobile));
//    }
//
//    /**
//     * ✅ Update only Electricity Bill
//     * - Finds user by ID.
//     * - Updates ebill field only.
//     * - Saves updated user and returns UserDto.
//     *
//    @Override
//    public UserDto updateUserEbill(Long userId, Double ebill) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        user.setUserEbill(ebill);
//        return mapToDto(userRepository.save(user));
//    }*/
//    
//    // ✅ Update only electricity bill
//    @Override
//    public UserDto updateUserEbill(Long id, Double ebill) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//
//        user.setUserEbill(ebill);  // only update ebill
//        User updatedUser = userRepository.save(user);
//
//        return mapToDto(updatedUser);
//    }
//
//  }
//

package com.pg.admin.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pg.admin.dto.UserDto;
import com.pg.admin.entity.User;
import com.pg.admin.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // =========================================
    // 🔄 ENTITY → DTO
    // =========================================
    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userPassword(user.getUserPassword())
                .userRoom(user.getUserRoom())
                .userAadhar(user.getUserAadhar())
                .userPlace(user.getUserPlace())
                .userMobile(user.getUserMobile())
                .userMonthlyRent(user.getUserMonthlyRent())
                .userEbill(user.getUserEbill())
                .paymentStatus(user.getPaymentStatus())
                .build();
    }

    // =========================================
    // 🔄 DTO → ENTITY
    // =========================================
    private User mapToEntity(UserDto dto) {
        return User.builder()
                .userId(dto.getUserId())
                .userName(dto.getUserName())
                .userPassword(dto.getUserPassword())
                .userRoom(dto.getUserRoom())
                .userAadhar(dto.getUserAadhar())
                .userPlace(dto.getUserPlace())
                .userMobile(dto.getUserMobile())
                .userMonthlyRent(dto.getUserMonthlyRent())
                .userEbill(dto.getUserEbill())
                .paymentStatus(dto.getPaymentStatus())
                .build();
    }

    // =========================================
    // ✅ CREATE USER
    // =========================================
    @Override
    public UserDto createUser(UserDto userDto) {

        User user = mapToEntity(userDto);

        // 🔐 Encode password
        user.setUserPassword(passwordEncoder.encode(userDto.getUserPassword()));

        // 🔥 Always set payment status to DUE when creating
        user.setPaymentStatus("DUE");

        User savedUser = userRepository.save(user);

        return mapToDto(savedUser);
    }

    // =========================================
    // ✅ GET USER BY ID
    // =========================================
    @Override
    public UserDto getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // =========================================
    // ✅ UPDATE USER
    // =========================================
    @Override
    public UserDto updateUser(Long userId, UserDto userDto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserName(userDto.getUserName());
        user.setUserRoom(userDto.getUserRoom());
        user.setUserAadhar(userDto.getUserAadhar());
        user.setUserPlace(userDto.getUserPlace());
        user.setUserMobile(userDto.getUserMobile());
        user.setUserMonthlyRent(userDto.getUserMonthlyRent());
        user.setUserEbill(userDto.getUserEbill());

        User updatedUser = userRepository.save(user);

        return mapToDto(updatedUser);
    }

    // =========================================
    // ✅ DELETE USER
    // =========================================
    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // =========================================
    // ✅ GET ALL USERS
    // =========================================
    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // =========================================
    // ✅ FIND BY MOBILE
    // =========================================
    @Override
    public UserDto getUserByMobile(String mobile) {
        return userRepository.findByUserMobile(mobile)
                .map(this::mapToDto)
                .orElseThrow(() ->
                        new RuntimeException("User not found with mobile: " + mobile));
    }

    // =========================================
    // ✅ UPDATE ELECTRICITY BILL
    // =========================================
    @Override
    public UserDto updateUserEbill(Long id, Double ebill) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found with id: " + id));

        user.setUserEbill(ebill);

        // 🔥 Whenever EBILL changes → reset status to DUE
        user.setPaymentStatus("DUE");

        User updatedUser = userRepository.save(user);

        return mapToDto(updatedUser);
    }
    /*@Override
    public UserDto updatePaymentStatus(Long id, String status) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setPaymentStatus(status);

        return mapToDto(userRepository.save(user));
    }
    */
    
    @Override
    public UserDto updatePaymentStatus(Long id, String status) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPaymentStatus(status);

        return mapToDto(userRepository.save(user));
    }
}

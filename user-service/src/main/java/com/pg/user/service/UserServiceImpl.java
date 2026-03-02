package com.pg.user.service;


//package com.pg.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pg.user.dto.UserDto;
import com.pg.user.entity.User;
import com.pg.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // ================= LOGIN =================
    @Override
    public UserDto login(String userName, String rawPassword) {

        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getUserPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return mapToDto(user);
    }

    // ================= GET USER BY ID =================
    @Override
    public UserDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToDto(user);
    }

    // ================= COMMON MAPPING METHOD =================
    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userRoom(user.getUserRoom())
                .userPlace(user.getUserPlace())
                .userAadhar(user.getUserAadhar())
                .userMonthlyRent(user.getUserMonthlyRent())
                .userEbill(user.getUserEbill())
                .userMobile(user.getUserMobile())
                .build();
    }
}













//
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.pg.user.dto.UserDto;
//import com.pg.user.entity.User;
//import com.pg.user.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class UserServiceImpl implements UserService {
//	
//
//	    private final UserRepository userRepository;
//	    private final PasswordEncoder passwordEncoder;
//
//	    @Override
//	    public UserDto login(String userName, String rawPassword) {
//	        User user = userRepository.findByUserName(userName)
//	                .orElseThrow(() -> new RuntimeException("User not found"));
//
//	        if (!passwordEncoder.matches(rawPassword, user.getUserPassword())) {
//	            throw new RuntimeException("Invalid username or password");
//	        }
//
//	        // Map to DTO (manual or ModelMapper)
//	        UserDto dto = new UserDto();
//	        dto.setUserId(user.getUserId());
//	        dto.setUserName(user.getUserName());
//	        dto.setUserRoom(user.getUserRoom());
//	        dto.setUserAadhar(user.getUserAadhar());
//	        dto.setUserPlace(user.getUserPlace());
//	        dto.setUserMonthlyRent(user.getUserMonthlyRent());
//	        dto.setUserEbill(user.getUserEbill());
//	        dto.setUserMobile(user.getUserMobile());
//	        return dto;
//	    }
//	    
//	    
//	    
//	    
//	    @Override
//	    public UserDto getUserById(Long id) {
//	        User user = userRepository.findById(id)
//	                .orElseThrow(() -> new RuntimeException("User not found"));
//
//	        return UserDto.builder()
//	                .userId(user.getUserId())
//	                .userName(user.getUserName())
//	                .userRoom(user.getUserRoom())
//	                .userPlace(user.getUserPlace())
//	                .userAadhar(user.getUserAadhar())
//	                .userMonthlyRent(user.getUserMonthlyRent())
//	                .userEbill(user.getUserEbill())
//	                .userMobile(user.getUserMobile())
//	                .build();
//	    }
//	    
//	    
//	    
//   
//	    
//	}
//
//
//
//
//
//
//
//
//
//
//

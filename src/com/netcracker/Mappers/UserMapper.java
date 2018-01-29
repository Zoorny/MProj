package com.netcracker.Mappers;

import com.netcracker.Objects.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    public User mapRow(ResultSet resultSet, int i) throws SQLException {

        User user = new User();
        user.setId(resultSet.getInt("USER_ID"));
        user.setLogin(resultSet.getString("LOGIN"));
        user.setPassword(resultSet.getString("PASSWORD"));
        user.setNickname(resultSet.getString("NICKNAME"));
        user.setEmail(resultSet.getString("EMAIL"));

        return user;
    }
}

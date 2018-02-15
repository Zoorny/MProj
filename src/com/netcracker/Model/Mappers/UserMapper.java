package com.netcracker.Model.Mappers;

import com.netcracker.Model.Objects.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    public User mapRow(ResultSet resultSet, int i) throws SQLException {

        User user = new User();
        user.setId(resultSet.getInt("USER_ID"));
        user.setUsername(resultSet.getString("USERNAME"));
        //user.setPassword(resultSet.getString("PASSWORD"));
        user.setEmail(resultSet.getString("EMAIL"));

        return user;
    }
}

package com.netcracker.Model.Mappers;

import com.netcracker.Model.Objects.Preferences;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PreferencesMapper implements RowMapper<Preferences> {
    @Override
    public Preferences mapRow(ResultSet resultSet, int i) throws SQLException {
        Preferences preferences = new Preferences();
        preferences.setGenre(resultSet.getString("ALBUM_GENRE"));
        preferences.setRating(resultSet.getInt("AVG(ALBUM_RATING)"));
        return preferences;
    }
}

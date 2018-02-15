package com.netcracker.Model.Mappers;

import com.netcracker.Model.Objects.Song;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SongMapper implements RowMapper<Song> {
    public Song mapRow(ResultSet resultSet, int i) throws SQLException {
        Song song = new Song();
        song.setTitle(resultSet.getString("song_title"));
        song.setDuration(resultSet.getInt("song_duration"));
        return song;
    }
}

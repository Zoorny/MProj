package com.netcracker.Model.Mappers;

import com.netcracker.Model.Objects.Artist;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class ArtistMapper implements RowMapper<Artist> {

    public Artist mapRow(ResultSet resultSet, int i) throws SQLException {

        Artist artist = new Artist();
        artist.setId(resultSet.getInt("artist_id"));
        artist.setName(resultSet.getString("artist_name"));
        artist.setDescription(resultSet.getString("artist_desc"));
        return artist;

    }
}

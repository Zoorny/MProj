package com.netcracker.Model.Mappers;


import com.netcracker.Model.Objects.Album;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class AlbumMapper implements RowMapper<Album> {

    public Album mapRow(ResultSet resultSet, int i) throws SQLException {

        Album album = new Album();
        album.setId(resultSet.getInt("album_id"));
        album.setArtistName(resultSet.getString("artist_name"));
        album.setTitle(resultSet.getString("album_title"));
        album.setYear(resultSet.getInt("album_year"));
        album.setDescription(resultSet.getString("album_desc"));
        album.setArtistId(resultSet.getInt("artist_id"));
        album.setGenre(resultSet.getString("album_genre"));
        return album;

    }
}

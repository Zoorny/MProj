package com.netcracker;

import com.netcracker.Mappers.AlbumMapper;
import com.netcracker.Mappers.ArtistMapper;
import com.netcracker.Mappers.UserMapper;
import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OracleDAOImpl implements OracleDAO {


    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public void addArtist(Artist artist) {
        String sql = "insert into ARTISTS (artist_id, artist_name, artist_desc) values (?,?,?)";
        jdbcTemplate.update(sql, new Object[]{artist.getId(), artist.getName(), artist.getDescription()});
    }

    public Artist getArtistById(int id) {
        String sql = "select * from ARTISTS where artist_id = :id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        return namedParameterJdbcTemplate.query(sql, namedParams, new ArtistMapper()).get(0);
    }

    public List<Artist> getAllArtists(){
        String sql = "SELECT * FROM artists";
        return namedParameterJdbcTemplate.query(sql, new ArtistMapper());
    }

    public void deleteArtistById(int id) {
        String sql = "delete from artists where artist_id = ?";
        jdbcTemplate.update(sql, new Object[]{id});
    }

    public List<Album> getAlbums(){
        String sql = "SELECT album_id,artist_name,album_title,album_year,album_desc FROM " +
                "albums, artists WHERE albums.artist_id = artists.artist_id";

        return namedParameterJdbcTemplate.query(sql, new AlbumMapper());
    }

    public Album getAlbumById(int id) {
        String sql = "select * from ALBUMS where ALBUM_ID = :id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        return namedParameterJdbcTemplate.query(sql, namedParams, new AlbumMapper()).get(0);
    }

    public void createUser(User user) {
        String sql = "insert into USERS (USERNAME, PASSWORD, EMAIL, ENABLED) values (?,?,?,?)";
        String sql2 = "insert into USER_ROLES (USERNAME, ROLE) values (?,?)";
        jdbcTemplate.update(sql, new Object[]{user.getUsername(), user.getPassword(), user.getEmail(), "true"});
        jdbcTemplate.update(sql2, new Object[]{user.getUsername(), "ROLE_USER"});
    }

    public User findUserByUsername(String username) {
        String sql = "select * from USERS where USERNAME = :username";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("username", username);
        return namedParameterJdbcTemplate.query(sql, namedParams, new UserMapper()).get(0);
    }




}

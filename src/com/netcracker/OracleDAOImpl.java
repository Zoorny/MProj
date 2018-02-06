package com.netcracker;

import com.netcracker.Mappers.AlbumMapper;
import com.netcracker.Mappers.ArtistMapper;
import com.netcracker.Mappers.SongMapper;
import com.netcracker.Mappers.UserMapper;
import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.Song;
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
        String albumsSql = "select * from ALBUMS, ARTISTS where ALBUMS.ARTIST_ID = :id AND ALBUMS.ARTIST_ID = ARTISTS.ARTIST_ID";
        String sql = "select * from ARTISTS where artist_id = :id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        List<Album> albums = namedParameterJdbcTemplate.query(albumsSql, namedParams, new AlbumMapper());
        Artist artist = namedParameterJdbcTemplate.query(sql, namedParams, new ArtistMapper()).get(0);
        artist.setAlbums(albums);
        return artist;
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
        String sql = "SELECT album_id,artist_name,album_title,album_year,album_desc,albums.artist_id" +
                " FROM albums, artists WHERE albums.artist_id = artists.artist_id";

        return namedParameterJdbcTemplate.query(sql, new AlbumMapper());
    }

    public Album getAlbumById(int id) {
        String sql = "select album_id,artist_name,album_title,album_year,album_desc,albums.artist_id" +
                " from ALBUMS, ARTISTS where ALBUM_ID = :id AND albums.artist_id = artists.artist_id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        String songsSql = "select * from SONGS, ALBUMS where ALBUMS.ALBUM_ID = :id AND albums.album_id = songs.album_id";
        List<Song> songs = namedParameterJdbcTemplate.query(songsSql, namedParams, new SongMapper());
        Album album = namedParameterJdbcTemplate.query(sql, namedParams, new AlbumMapper()).get(0);
        album.setSongs(songs);
        return album;
    }

    public void createUser(User user) {
        String sql = "insert into USERS (USERNAME, PASSWORD, EMAIL, ENABLED) values (?,?,?,?)";
        String sql2 = "insert into USER_ROLES (USERNAME, ROLE) values (?,?)";
        jdbcTemplate.update(sql, new Object[]{user.getUsername(), user.getPassword(), user.getEmail(), "true"});
        jdbcTemplate.update(sql2, new Object[]{user.getUsername(), "ROLE_USER"});
    }

    public User getUserByUsername(String username) {
        String sql = "select * from USERS where USERNAME = :username";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("username", username);
        return namedParameterJdbcTemplate.query(sql, namedParams, new UserMapper()).get(0);
    }

    public String getAlbumRating(int albumId, int userId) {
        String sql = "select ALBUM_RATING FROM ALBUM_RATINGS WHERE ALBUM_ID = ? AND USER_ID = ?";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        return jdbcTemplate.queryForObject(sql, new Object[]{albumId, userId}, String.class);
    }

    public void setAlbumRating(int albumId, int userId, int rating) {
        String sql = "insert into ALBUM_RATINGS (ALBUM_ID, USER_ID, ALBUM_RATING) values (?,?,?)";
        jdbcTemplate.update(sql, new Object[]{albumId, userId, rating});
    }




}

package com.netcracker.Model.DAO;

import com.netcracker.Model.Mappers.*;
import com.netcracker.Model.Objects.*;
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
        String sql = "SELECT album_id,artist_name,album_title,album_year,album_desc,albums.artist_id, albums.album_genre" +
                " FROM albums, artists WHERE albums.artist_id = artists.artist_id";
        return namedParameterJdbcTemplate.query(sql, new AlbumMapper());
    }

    public Album getAlbumById(int id) {
        String sql = "select album_id,artist_name,album_title,album_year,album_desc,albums.artist_id, albums.ALBUM_GENRE" +
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

    public User getUserById(int id) {
        String sql = "select * from USERS where USER_ID = :id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        return namedParameterJdbcTemplate.query(sql, namedParams, new UserMapper()).get(0);
    }

    public String getAlbumRating(int albumId, String username) {
        String sql = "select ALBUM_RATING FROM ALBUM_RATINGS WHERE ALBUM_ID = ? AND USERNAME = ?";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        try{
            String result = jdbcTemplate.queryForObject(sql, new Object[]{albumId, username}, String.class);
            return result;
        }catch (Exception e){}
        return "empty";
    }

    public void setAlbumRating(int albumId, String username, int rating) {
        String sql = "merge into ALBUM_RATINGS r1 USING (select :albumId ALBUM_ID, :username USERNAME  FROM dual) r2 " +
                "ON (r1.USERNAME = r2.USERNAME AND r1.ALBUM_ID = r2.ALBUM_ID) " +
                "WHEN MATCHED THEN UPDATE SET r1.ALBUM_RATING = :rating " +
                "WHEN NOT MATCHED THEN INSERT (ALBUM_ID, USERNAME, ALBUM_RATING) values (:albumId,:username,:rating)";
        //String sql = "insert into ALBUM_RATINGS (ALBUM_ID, USERNAME, ALBUM_RATING) values (?,?,?)";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("albumId", albumId);
        namedParams.put("username", username);
        namedParams.put("rating", rating);
        namedParameterJdbcTemplate.update(sql, namedParams);
    }

    public void deleteAlbumRating(int albumId, String username) {

        String sql = "delete from ALBUM_RATINGS where ALBUM_ID = ? AND USERNAME = ?";
        jdbcTemplate.update(sql, new Object[]{albumId, username});

    }

    public int getTotalAlbumRating(int albumId) {
        String sql = "select AVG(ALBUM_RATING) FROM ALBUM_RATINGS WHERE ALBUM_ID = ?";

            Integer result =jdbcTemplate.queryForObject(sql, new Object[]{albumId}, Integer.class);
            if (result != null) return result;
            else return 0;

    }

    public void createReview(Review review){
        String sql = "insert into ALBUM_REVIEWS (USER_ID, ALBUM_ID, REVIEW_TEXT, REVIEW_DATE) values (?,?,?,?)";
        jdbcTemplate.update(sql, new Object[]{review.getUserId(), review.getAlbumId(), review.getText(), review.getDate()});
    }

    public Review getAlbumReview(int albumId, int userId) {
        String sql = "select * from ALBUM_REVIEWS where USER_ID = :userId AND ALBUM_ID = :albumId";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("userId", userId);
        namedParams.put("albumId", albumId);
        List<Review> reviews =  namedParameterJdbcTemplate.query(sql, namedParams, new ReviewMapper());
        if (!reviews.isEmpty()) return reviews.get(0);
        else return null;
    }

    public List<Review> getReviews(int albumId) {
        String sql = "SELECT * FROM ALBUM_REVIEWS WHERE ALBUM_ID = :albumId";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("albumId", albumId);
        List<Review> reviews =  namedParameterJdbcTemplate.query(sql, namedParams, new ReviewMapper());
        return reviews;
    }

    public List<Album> selectAlbums(AlbumRequest request){

        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("genres", request.getGenres());
        if (request.getMinDate() == 0) namedParams.put("minDate", "0");
        else namedParams.put("minDate", request.getMinDate());
        if (request.getMaxDate() == 0) namedParams.put("maxDate", "3000");
        else namedParams.put("maxDate", request.getMaxDate());

        String sql = "SELECT albums.album_id, ARTISTS.artist_name, albums.album_title,albums.album_year,albums.album_desc,albums.artist_id, albums.album_genre" +
                " FROM albums, artists" +
                " WHERE albums.artist_id = artists.artist_id" +
                " AND ALBUM_YEAR>= :minDate AND ALBUM_YEAR<= :maxDate";
        if(request.getGenres().length != 0){
            sql+=" AND (";
            for (int i=0; i< request.getGenres().length; i++) {

                sql += " albums.ALBUM_GENRE = " + "'" + request.getGenres()[i] + "'";
                if(!(request.getGenres().length == i+1)){
                    sql+= " OR";
                } else sql+=")";
            }
        }

        if(request.getArtistName() != null && request.getArtistName() != "") {
            namedParams.put("artist", request.getArtistName());
            sql+= " AND ARTISTS.artist_name = :artist";
        }
        List<Album> albums =  namedParameterJdbcTemplate.query(sql, namedParams, new AlbumMapper());

        return albums;
    }


    public Map<String, Integer> getPreferences(String username) {

        Map<String, Integer> prefMap = new HashMap<>();
        String sql = "SELECT AVG(ALBUM_RATING), ALBUMS.ALBUM_GENRE  FROM ALBUM_RATINGS, ALBUMS" +
        " WHERE ALBUM_RATINGS.USERNAME = :username" +
        " AND ALBUM_RATINGS.ALBUM_ID = ALBUMS.ALBUM_ID" +
        " GROUP BY ALBUMS.ALBUM_GENRE";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("username", username);
        List<Preferences> preferences =  namedParameterJdbcTemplate.query(sql, namedParams, new PreferencesMapper());

        for (Preferences preference :
                preferences) {
            prefMap.put(preference.getGenre(), preference.getRating());
        }
        return prefMap;
    }

    @Override
    public List<Album> getRatedAlbums(String username) {
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("username", username);
        String sql = "SELECT ALBUMS.album_id,ARTISTS.artist_name,ALBUMS.album_title,ALBUMS.album_year,ALBUMS.album_desc,albums.artist_id, albums.album_genre" +
                " FROM albums, artists, ALBUM_RATINGS WHERE albums.artist_id = artists.artist_id AND ALBUM_RATINGS.USERNAME = :username AND ALBUMS.ALBUM_ID=ALBUM_RATINGS.ALBUM_ID";
        return namedParameterJdbcTemplate.query(sql, namedParams, new AlbumMapper());
/*        String sql = "SELECT * FROM ARTISTS";


        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("username", username);
        List<Album> albums =  namedParameterJdbcTemplate.query(sql, namedParams, new AlbumMapper());
        return albums;*/
    }


}

package com.netcracker.Model.DAO;
import com.netcracker.Model.Objects.*;

import java.util.List;
import java.util.Map;

public interface OracleDAO {

    void addArtist(Artist artist);
    Artist getArtistById(int id);
    List<Artist> getAllArtists();
    void deleteArtistById(int id);

    Album getAlbumById(int id);
    List<Album> getAlbums();

    void createUser(User user);
    User getUserByUsername(String username);
    User getUserById(int id);

    String getAlbumRating(int albumId, String username);
    void setAlbumRating(int albumId, String username, int rating);
    void deleteAlbumRating(int albumId, String username);
    int getTotalAlbumRating(int albumId);

    void createReview(Review review);
    Review getAlbumReview(int albumId, int userId);
    List<Review> getReviews(int albumId);

    List<Album> selectAlbums(AlbumRequest request);

    List<Album> getRatedAlbums(String name);

    Map<String, Integer> getPreferences(String username);



}

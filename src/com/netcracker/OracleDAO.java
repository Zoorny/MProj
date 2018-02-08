package com.netcracker;
import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.Review;
import com.netcracker.Objects.User;

import java.util.List;

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
    String getTotalAlbumRating(int albumId);

    void createReview(Review review);
    Review getAlbumReview(int albumId, int userId);
    List<Review> getReviews(int albumId);

}

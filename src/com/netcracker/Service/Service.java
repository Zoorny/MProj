package com.netcracker.Service;

import com.netcracker.Model.Objects.*;

import java.util.List;

public interface Service {

    void addArtist(Artist artist);
    Artist getArtistById(int id);
    List<Artist> getAllArtists();
    void deleteArtistById(int id);

    Album getAlbumById(int id);
    List<Album> getAlbums();

    boolean createUser(User user);
    User getUserByUsername(String username);

    String getAlbumRating(int albumId, String username);
    void setAlbumRating(int albumId, String username, int rating);
    void deleteAlbumRating(int albumId, String username);
    int getTotalAlbumRating(int albumId);

    void createReview(Review review);
    Review getAlbumReview(int albumId, String username);
    List<Review> getReviews(int albumId);

    List<Album> selectAlbums(AlbumRequest request);

    List<Album> getRecommendations(String username);


}

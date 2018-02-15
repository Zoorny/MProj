package com.netcracker.Model.Objects;


import java.util.List;

public class Album {

    private int id;
    private String artistName;
    private String title;
    private int year;
    private String description;
    private int artistId;
    private List<Song> songs;
    private int rating;
    private String genre;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getArtistId() {
        return artistId;
    }

    public void setArtistId(int artistId) {
        this.artistId = artistId;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    @Override
    public String toString() {
        return "Album{" +
                "id=" + id +
                ", artistName='" + artistName + '\'' +
                ", title='" + title + '\'' +
                ", year=" + year +
                ", description='" + description + '\'' +
                ", artistId=" + artistId +
                ", songs=" + songs +
                ", rating=" + rating +
                ", genre='" + genre + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Album album = (Album) o;

        if (getId() != album.getId()) return false;
        if (getYear() != album.getYear()) return false;
        if (getArtistId() != album.getArtistId()) return false;
        if (getRating() != album.getRating()) return false;
        if (getArtistName() != null ? !getArtistName().equals(album.getArtistName()) : album.getArtistName() != null)
            return false;
        if (getTitle() != null ? !getTitle().equals(album.getTitle()) : album.getTitle() != null) return false;
        if (getDescription() != null ? !getDescription().equals(album.getDescription()) : album.getDescription() != null)
            return false;
        if (getSongs() != null ? !getSongs().equals(album.getSongs()) : album.getSongs() != null) return false;
        return getGenre() != null ? getGenre().equals(album.getGenre()) : album.getGenre() == null;
    }

    @Override
    public int hashCode() {
        int result = getId();
        result = 31 * result + (getArtistName() != null ? getArtistName().hashCode() : 0);
        result = 31 * result + (getTitle() != null ? getTitle().hashCode() : 0);
        result = 31 * result + getYear();
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + getArtistId();
        result = 31 * result + (getSongs() != null ? getSongs().hashCode() : 0);
        result = 31 * result + getRating();
        result = 31 * result + (getGenre() != null ? getGenre().hashCode() : 0);
        return result;
    }
}

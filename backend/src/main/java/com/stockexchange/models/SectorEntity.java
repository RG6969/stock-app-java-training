package com.stockexchange.models;



import javax.persistence.*;

@Entity
@Table(name="sectors")
public class SectorEntity  {
	
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name="id", length=5)
    private Long id;

    @Column(name="name", length=20)
    private String name;

    @Column(name="brief", length=100)
    private String brief;

    public Long getId() {
        return id;
    }

    public SectorEntity() {
		super();
	}

	public SectorEntity(String name, String brief) {
		super();
		this.name = name;
		this.brief = brief;
	}

	public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }
}
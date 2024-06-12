import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'



@Entity('docs')
export class Doc {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: 'varchar', default: '' })
	label: string;

	@ManyToOne(() => User, user => user.docs, { nullable: true, onDelete: 'CASCADE' })
	user: User;
}

@Entity('providers')
export class Provider {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: 'varchar', default: '' })
	type: string;

	@Column({ type: 'text' })
	token: string;

	@ManyToOne(() => User, user => user.providers, { onDelete: 'CASCADE' })
	user: User;
}


@Entity('users')
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: 'varchar', default: '' })
	email: string;

	@Column({ type: 'varchar', default: '' })
	name: string;

	@Column({ type: 'varchar', default: '' })
	password: string;

	@Column({ type: 'varchar', default: '' })
	salt: string;

	@OneToMany(() => Doc, node => node.user, { cascade: true })
	docs: Doc[];

	@OneToMany(() => Provider, provider => provider.user, { cascade: true })
	providers: Provider[];
}
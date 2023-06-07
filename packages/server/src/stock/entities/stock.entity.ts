import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column({ default: 0 })
  countOfBoxies: number;
  @Column()
  countOfItems: number;

  totalAmount: number;

  @AfterLoad()
  total() {
    this.totalAmount = this.countOfBoxies * this.countOfItems;
  }
}

import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-satus.enum";
import { User } from "src/auth/user.entity";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();
        return boards;
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
            user: user
        });

        await this.save(board);
        return board;
    }
    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.delete({ id: id, user: user });
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id: ${id}`);
        }

        console.log("result", result);
    }
}